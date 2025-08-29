#!/bin/bash
set -e


# Check for npm and install with brew if missing
if ! command -v npm &> /dev/null; then
  echo "npm not found. Installing Node.js and npm with Homebrew..."
  brew install node
fi

# Install Node.js dependencies for all workspaces


# Clean up node_modules and lock files
rm -rf node_modules package-lock.json yarn.lock
npm install

# Install Go dependencies for backend
cd apps/backend
go mod tidy
cd ../../

# Clean up frontend node_modules and lock files
cd apps/frontend
rm -rf node_modules package-lock.json yarn.lock
npm install
cd ../../


# Install Go if not found
if ! command -v go &> /dev/null; then
  echo "Go not found. Installing Go with Homebrew..."
  brew install go
fi

# Install Go dependencies for backend
cd apps/backend
go mod tidy
cd ../../

echo "All dependencies installed."
