#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

pause_on_error() {
  status=$?
  trap - EXIT
  if [ "$status" -ne 0 ] && [ -t 0 ]; then
    printf '\nRunner stopped with an error. Press Enter to close this window...'
    read -r
  fi
  exit "$status"
}
trap pause_on_error EXIT

PORT=${PORT:-3000}
echo "Starting Mini Mystic Palette locally on port $PORT..."

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js was not found in Git Bash. Install Node.js 20 or newer, then reopen Git Bash."
  exit 1
fi

NODE_VERSION=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "This project requires Node.js 20 or newer. Git Bash found $(node -v)."
  echo "Install Node.js 20 or newer, then reopen Git Bash."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

npm run dev -- --port "$PORT"
