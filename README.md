# Nexus Agency

Nexus Agency is a premium digital agency website with a polished Vite frontend and a production-ready backend using Express, Prisma, and real-time chat features.

## Repository Structure

- `src/` — Frontend application source code
- `public/` — Static assets and PWA files
- `backend/` — Node/Express backend with Prisma, authentication, chat, and AI services
- `.github/workflows/` — GitHub Actions workflow for automated GitHub Pages deployment
- `Dockerfile`, `docker-compose.yml` — Containerization and local development orchestration

## Features

- Modern SPA with route-driven pages and premium UI/UX
- AI-powered project brief generation
- Real-time chat and support workspace
- User and admin dashboards
- Backend API with authentication, project management, notifications, and files
- Docker-ready deployment for local development
- GitHub Pages workflow for frontend deployment

## Quick Start

### Prerequisites

- Node.js 20.x
- npm 10.x or later
- Docker and Docker Compose (optional, for local containerized backend)

### Local Frontend Development

1. Install dependencies
   ```bash
   npm ci
   ```
2. Start the frontend development server
   ```bash
   npm run dev
   ```
3. Open the URL shown in the terminal.

### Local Backend Development

1. Change into the backend folder
   ```bash
   cd backend
   ```
2. Install backend dependencies
   ```bash
   npm ci
   ```
3. Copy the environment example
   ```bash
   cp .env.example .env
   ```
4. Update `backend/.env` with your database and service credentials.
5. Start the backend server
   ```bash
   npm run dev
   ```

### Docker Setup

1. Copy the backend environment example and update secrets:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Start services with Docker Compose:
   ```bash
   docker compose up --build
   ```
3. The frontend will be available at `http://localhost:8080` and the backend at `http://localhost:5000`.

## Environment Variables

### Frontend

Create a `.env` file in the root folder with the following values:

```bash
VITE_API_BASE=http://localhost:5000/api/v1
```

### Backend

Use the example file `backend/.env.example` and set the values for:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `GEMINI_API_KEY`
- `FRONTEND_URL`
- `REDIS_URL` (optional)

## Production Build

```bash
npm run build
```

The production-ready static frontend output will be generated in `dist/`.

## GitHub Pages Deployment

This repository includes a GitHub Actions workflow that automatically builds and deploys the frontend to GitHub Pages when changes are pushed to `main`.

### Expected GitHub Pages URL

`https://zeyad-shehata.github.io/nexus-agency`

## Notes

- The backend is not deployed via GitHub Pages. Use Docker or a proper Node hosting provider for the backend API.
- The frontend is configured for relative asset loading and includes a `404.html` fallback for GitHub Pages route support.

## License

This project is provided as-is for professional deployment and development.
