#!/bin/bash
set -e

# Start backend
cd apps/backend
if command -v go &> /dev/null; then
  go run main.go &
  BACKEND_PID=$!
else
  echo "Go is not installed. Please install Go 1.21 or higher."
  exit 1
fi
cd ../../

# Start frontend
cd apps/frontend
if command -v npx &> /dev/null; then
  npx expo start --web
else
  echo "Node.js and Expo CLI are required. Please install Node.js and Expo CLI."
  exit 1
fi
