# TalentIQ

TalentIQ is a collaborative coding interview platform built with React, Vite, Express, Socket.IO, and MongoDB. It supports authenticated users, shared interview sessions, real-time code syncing, live video calls, interactive problem statements, and code execution.

## Key Features

- Authenticated user access with Clerk
- Real-time collaborative coding using Socket.IO
- Video calls and live session collaboration via Stream Video SDK
- Coding problems with starter code, descriptions, and examples
- Session management (create, join, end) with host/participant roles
- Server-side API for chat, session management, and event handling
- Code execution powered by Piston

## Tech Stack

- Backend: Node.js, Express, Inngest, MongoDB, Mongoose, Socket.IO, Clerk
- Frontend: React, Vite, Tailwind CSS, Stream Video SDK, React Query
- Deployment: single repo with backend and frontend packages

## Repository Structure

- `Backend/`
  - `src/server.js` - Express server and Socket.IO setup
  - `src/Controllers/` - route controllers for chat and session logic
  - `src/Routes/` - API route definitions
  - `src/lib/` - database, environment, and event integration utilities
  - `src/Middleware/` - route protection middleware
  - `src/Models/` - Mongoose models for sessions and users

- `Frontend/`
  - `src/App.jsx` - application routes and authentication guard
  - `src/Pages/` - pages for dashboard, problems, and live session view
  - `src/components/` - UI components for code editor, output panel, navbar, and video call
  - `src/hooks/` - custom hooks for sessions, streaming, and code sync
  - `src/lib/` - client utilities for Axios, Piston execution, and helpers

## Getting Started

### Prerequisites

- Node.js 18+ (or compatible)
- npm
- MongoDB instance or connection URI
- Clerk account and API keys
- Stream account and API keys

### Environment Variables

Create a `.env` file in `Backend/` with the following values:

```env
PORT=5000
DB_URL=<your-mongodb-connection-string>
CLIENT_URL=http://localhost:5173
INGEST_EVENT_KEY=<your-inngest-event-key>
INGEST_SIGNING_KEY=<your-inngest-signing-key>
STREAM_API_KEY=<your-stream-api-key>
STREAM_API_SECRET=<your-stream-api-secret>
CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NODE_ENV=development
```

### Install Dependencies

From the project root:

```bash
npm install
npm install --prefix Backend
npm install --prefix Frontend
```

### Run Locally

Start the backend server:

```bash
npm run start --prefix Backend
```

Start the frontend in development mode:

```bash
npm run dev --prefix Frontend
```

Alternatively, from the root you can install and build both packages:

```bash
npm run build
```

## Useful Scripts

- `npm run start --prefix Backend` - run backend server
- `npm run dev --prefix Backend` - run backend with nodemon
- `npm run dev --prefix Frontend` - run frontend dev server
- `npm run build --prefix Frontend` - build frontend for production
- `npm run lint --prefix Frontend` - lint frontend source code

## Deployment Notes

In production, the backend serves the compiled frontend from `Frontend/dist`.

- Build the frontend first: `npm run build --prefix Frontend`
- Start the backend server: `npm run start --prefix Backend`

## Contribution

Contributions are welcome! Please open issues or pull requests to improve TalentIQ.

## License

ISC
