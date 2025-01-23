#!/bin/bash

# This script runs during building the sandbox template
# and makes sure the Vite server is running
function ping_server() {
  counter=0
  response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5173")
  while [[ ${response} -ne 200 ]]; do
    let counter++
    if ((counter % 20 == 0)); then
      echo "Waiting for Vite server to start..."
      sleep 0.1
    fi

    response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5173")
  done
}

# Initialize git repo and config in .temp directory
cd /home/user/.temp && git init

# Create .gitignore file
echo "node_modules/" >.gitignore

git config --global --add safe.directory *
git config --global user.name "dessn.ai"
git config --global user.email "agent@dessn.ai"
git add .
git commit -m "Initial commit"

ping_server &
cd /home/user/.temp && bun run dev
