#!/usr/bin/env bash

# helpful functions
status() {
  echo "-----> $*"
}

# sed -l basically makes sed replace and buffer through stdin to stdout
# so you get updates while the command runs and dont wait for the end
# e.g. npm install | indent
indent() {
  c='s/^/       /'
  case $(uname) in
    Darwin) sed -l "$c";; # mac/bsd sed: -l buffers on line boundaries
    *)      sed -u "$c";; # unix/gnu sed: -u unbuffered (arbitrary) chunks of data
  esac
}

# switch to client folder and install ember
cd client

status "Installing ember-cli and bower"
npm install ember-cli bower | indent

status "Installing node dependencies"
npm install | indent

status "Installing bower dependencies"
node_modules/bower/bin/bower install | indent

status "Building ember-cli application"
node_modules/ember-cli/bin/ember build --environment=production | indent
