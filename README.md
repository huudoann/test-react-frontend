# React Frontend Demo

This is a test repository for the deployment system with backend integration.

## Features

- ✅ Connect to NestJS backend API
- ✅ Health check endpoint
- ✅ Full CRUD operations for Users
- ✅ Configurable backend URL
- ✅ Real-time connection status

## Installation

```bash
npm install
```

## Configuration

### Option 1: Environment Variable

Create a `.env` file in the root directory:

```bash
REACT_APP_API_URL=http://localhost:3001
```

### Option 2: UI Configuration

You can also configure the backend URL directly in the UI using the input field at the top of the page.

## Running the Application

```bash
# Development
npm start

# Production build
npm run build
```

The app will run on `http://localhost:3000` by default.

## Backend Connection

This frontend connects to the NestJS backend. Make sure the backend is running:

1. Navigate to `test-nestjs-backend/postgres-app` (or mysql-app, mongo-app)
2. Run `npm install && npm run start:dev`
3. Backend will run on `http://localhost:3001` (or port specified in backend config)

## API Endpoints Used

- `GET /health` - Health check
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Build Configuration

- **Language**: JavaScript
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (development) or use `serve` for production
- **Publish Directory**: `build`
- **Exposed Port**: 3000 (default)

## Testing Deployment

1. Use this repo to test frontend deployment
2. Set `publishDir` to `build` in the deployment config
3. The build will create static files in the `build` directory
4. Use `serve` to serve the static files in production
5. Make sure backend URL is accessible from the deployed frontend

