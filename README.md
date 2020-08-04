## How to Use and Manage the material-design-icons Fork

* Always `npm run build-index` before committing any changes/additions/removals of SVGs.
* Original folder structure has been preserved as it makes for easy diffing/updates from original library.
* Available exports shown in index.js - Naming convention as currently follows is: ROOTFOLDER_FILENAME in caps with "ic_" and ".svg" removed and all dashes converted to underscores.
* SVG loader optimizations in host app should be taking care of minification and any other modifications.

## Notes/Potential Upgrades
* May want to abandon current structure and massively rename all icons so that both file and import name can match exactly.
* Could create a Storybook-style preview page with all icons and their export names.
* Left multiple sizes of SVGs as unsure if they would be useful, but may be best to just pick a size and enforce usage of that by deleting the rest. Can also modify import-index-generator to remove pixel size from the component names.


### Repo for forked modules that require custom editing. License should generally be MIT or equivalent if you want to edit open source code. 

### Add module to your project
Add to your project's package.json like so:  

    "react-timekeeper": "https://github.com/SnapClose/forked-modules.git#react-timekeeper",

### Add module to this repo:

    git clone https://github.com/SnapClose/forked-modules.git ; cd forked-modules ; for remote in $(git branch -r | grep -vE "HEAD|master"); do git branch --track ${remote#*/} $remote; done ; git checkout master

    git checkout -b your_branch_name

Duplicate the module you want to copy in here, and commit to your branch name.

Today is June 30!
## Material design icons

Material design icons is the official [icon set](https://www.google.com/design/spec/style/icons.html#icons-system-icons) from Google.  The icons are designed under the [material design guidelines](https://material.io/guidelines/).

### 3.0.1 Update

* Changed license in package.json.
* Added missing device symbol sprites.

### 3.0.0 Update

License change to Apache 2.0!

## Getting Started

Read the [developer guide](https://google.github.io/material-design-icons/) on how to use the material design icons in your project.

### Using a font collection

The `iconfont` folder contains pre-generated font files that can be included in a project. This is especially convenient for the web; however, it is generally better to link to the web font hosted on Google Fonts:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
```

Read more in the [font portion](https://google.github.io/material-design-icons/#icon-font-for-the-web) of our full developer guide.

### Using symbols and sprites

The `css-sprite` and `svg-sprite` folders contain pre-generated sprite sheets, as well as svg symbols that can be `<use>`d more directly and with fewer constraints. Instructions for using them are in the [sprites documentation](https://github.com/google/material-design-icons/tree/master/sprites).

## Polymer icons

If you wish to use the icon set with Polymer, we recommend consuming them via the [`<iron-icons>`](https://github.com/polymerelements/iron-icons) element ([`<core-icons>`](https://github.com/Polymer/core-icons) in v0.5).

## License

We have made these icons available for you to incorporate into your products under the [Apache License Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt). Feel free to remix and re-share these icons and documentation in your products.
We'd love attribution in your app's *about* screen, but it's not required. The only thing we ask is that you not re-sell these icons.
