#!/bin/bash
ROOT_DIR="$(pwd)"
DIST_DIR="${ROOT_DIR}/dist"
SCRIPT_FILE="${ROOT_DIR}/dist/index.js"

exit_script() {
  echo "BOT WAS DEACTIVATED"
  node "${DIST_DIR}/scripts/onBotDown.js" > /dev/null
}

trap exit_script SIGINT SIGTERM

node $SCRIPT_FILE
