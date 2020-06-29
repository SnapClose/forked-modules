### Repo for forked modules that require custom editing. License should generally be MIT or equivalent if you want to edit open source code. 

### Add module to your project
Add to your project's package.json like so:  

    "react-timekeeper": "https://github.com/SnapClose/forked-modules.git#react-timekeeper",

### Add module to this repo:

    git clone https://github.com/SnapClose/forked-modules.git ; cd forked-modules ; for remote in $(git branch -r | grep -vE "HEAD|master"); do git branch --track ${remote#*/} $remote; done ; git checkout master

    git checkout -b your_branch_name

Duplicate the module you want to copy in here, and commit to your branch name.

TEST
TEST2
