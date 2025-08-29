# League Management Monorepo

This monorepo contains a React Native + Expo frontend and a Go backend connected to a Postgres database.

## Prerequisites
- Homebrew (brew)
- Node.js (v18+ recommended)
- npm
- Go (v1.21+)
- Postgres database
- Expo CLI (`npm install -g expo-cli`)

## Setup

1. **Install all dependencies and runtimes:**
   ```bash
   # If you get a permission denied error, run:
   chmod +x scripts/install.sh
   # Then run:
   bash scripts/install.sh
   ```

2. **Configure your Postgres database:**
   - Ensure a Postgres instance is running.
   - Update the connection string in `apps/backend/main.go` if needed.

## Running the Application

Start both backend and frontend with one command:
```bash
    # If you get a permission denied error, run:
    chmod +x scripts/start.sh
    # Then run:
    bash scripts/start.sh
```
- Backend runs on port 8080
- Frontend runs with Expo (see terminal for QR code)

## Directory Structure
- `apps/frontend`: React Native + Expo app
- `apps/backend`: Go backend
- `packages/common`: Shared code
- `scripts/`: Utility scripts

## Notes
- For development, ensure your Postgres DB is accessible and credentials are correct.
- You may need to install Expo Go on your mobile device to run the frontend app.
- For custom environment variables, create `.env` files as needed.

## Troubleshooting
- If you encounter issues, check that all prerequisites are installed and your database is running.
- For Go or Node.js installation, refer to their official documentation.
