#!/usr/bin/env node

const HELP_MSG = `iigen [-r] [src-dir-path] [output] [list-extensions]

Get the list of the file just contained in the passed source directory path and
generates "index" files which exports a list of objects with the file name
(just the name with the extension but without the path) and the exported stuff.

The [-r] flag indicates to recur the source directory to list all the files on
it and its sub directories. It's optional, hence, by default, the tool doesn't
recur the directory. The flag can be set in any position, it isn't stricly
necessary to appear in the same position written in this help message.

The [ouput] parameter is optional an it's the file path used to write the
generated "index" file, otherwise a temporary file is generated.

The third parameter [list-extensions] is optional and only can be provided if
the [output] parameters is provided; it's a list of file extensions, comma
separated (with no spaces) which are considered to be Javascript modules, js by
default.

The command print out to the stdout the path to the autogenerated "index" file.

Example:
if the list of files in "my-src/components/" directory is
 - module.js
 - auth.vue
 - ignoreme

executing: iigen my-src/components components-index.js js,vue

The command will output in the stdout 'components-index.js' and will generate
such file with the next content:

import * as i0 from './my-src/components/auth.vue'
import * as i1 from './my-src/components/module.js'
export default [{ filename: 'auth.vue', exported: i0 }, { filename: 'module.js', exported: i1 }]


NOTE the tool doens't check the content of the files, so they are assumed to be
wel formatted Javascript modules
`

const fs = require('fs')
const path = require('path')
const relative = require('relative')
const version = require('./package.json').version

if (process.argv.length < 3) {
  exitWithError(`Error: the source directory path is required.

${HELP_MSG}
  `)
}
const cmdArgs = process.argv.slice(2)
const recurSrcDirPos = cmdArgs.findIndex((a) => a === '-r')
const recurSrcDir = (recurSrcDirPos !== -1)

if (recurSrcDir) {
  cmdArgs.splice(recurSrcDirPos, 1)
}

const srcDir = (path.isAbsolute(cmdArgs[0]))
  ? cmdArgs[0] : path.resolve(process.cwd(), cmdArgs[0])
const fileExts = (cmdArgs[2]) ? cmdArgs[2].split(',') : ['js']

let outputFilePath = cmdArgs[1]
// If not output file path was passed, generates a temporary file
if (!outputFilePath) {
  outputFilePath = path.join(
    fs.mkdtempSync('aiies6', 'utf8'),
    `${Date.now()}${Math.round(Math.random(99999) * 100000)}.js`
  )
} else if (!path.isAbsolute(outputFilePath)) {
  outputFilePath = path.resolve(process.cwd(), outputFilePath)
}

try {
  fs.readdirSync(srcDir)
} catch (e) {
  exitWithError(`${e.message}

${HELP_MSG}
`)
}

let relPathOutSrc = relative(path.dirname(outputFilePath), srcDir)
if ((relPathOutSrc[0] !== '.') && (relPathOutSrc[0] !== '/')) {
  relPathOutSrc = `./${relPathOutSrc}`
}

const outputFd = fs.openSync(outputFilePath, 'w+', parseInt('777', 8))
fs.writeSync(outputFd, `// DO NOT MODIFY THIS FILE: AUTOGENERATED BY iigen (v${version})\n`, null, 'utf8')

const filesList = listFilesInDir(srcDir, fileExts, recurSrcDir)

// sort to have a deterministic result
filesList.sort()

for (let idx = 0; idx < filesList.length; idx++) {
  const file = filesList[idx]
  const type = file.substring(0, file.indexOf('/')).toUpperCase()+'_';
  const modifiedFileName = type
   + file
    .toUpperCase()
    .substring(file.lastIndexOf('/') + 1, file.indexOf('.'))
    .replace(/-/g, '_')

  const exp = `export {default as ${modifiedFileName}} from '${relPathOutSrc}/${file}'\n`;

  fs.writeSync(outputFd, exp, null, 'utf8')
}

fs.closeSync(outputFd)

console.log(outputFilePath)

/** Helper functions **/
function exitWithError (msg) {
  console.error(msg)
  process.exit(1)
}

function listFilesInDir (dirPath, fileExts, recur = false) {
  const filesPaths = []
  const subDirsPaths = []

  for (let p of fs.readdirSync(dirPath)) {
    const stat = fs.lstatSync(path.join(dirPath, p))

    if (recur && stat.isDirectory()) {
      subDirsPaths.push(p)
      continue
    }

    if (!stat.isFile() && !stat.isSymbolicLink()) {
      continue
    }

    // get the extension of the filename without the '.'
    const ext = path.extname(p).slice(1)

    // Check if the file ha one of the specified extensions
    if (fileExts.find((e) => ext === e) !== undefined) {
      filesPaths.push(p)
    }
  }

  for (let dp of subDirsPaths) {
    let subDirFiles = listFilesInDir(path.join(dirPath, dp), fileExts, recur)

    subDirFiles = subDirFiles.map((f) => path.join(dp, f))
    filesPaths.push(...subDirFiles)
  }

  return filesPaths
}
