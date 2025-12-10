# EntertainmentHub

Discover and bookmark trending movies and TV series with a React + Vite + TypeScript frontend styled with Tailwind and Shadcn UI. Data is pulled from the OMDb API, and basic auth/bookmark state is stored locally.

## Features
- Trending movies and TV series fetched from curated IMDb IDs via OMDb.
- Global search across movies and series with results grid and loading states.
- Detail views for movies and TV entries with poster, year, rating and plot.
- Local bookmarks with add/remove persistence in `localStorage`.
- Mock login/signup flows that store a demo user/token locally (no backend).
- Responsive layout with sidebar navigation, tooltips, toasts and skeleton loaders.

## Tech Stack
- React 18, TypeScript, Vite
- Redux Toolkit for state, React Query for async caching
- React Router v6 for routing
- Tailwind CSS + Shadcn UI + Radix primitives
- OMDb API for media data

## Getting Started
Prerequisites: Node.js 18+ and npm.

```bash
git clone <repo-url>
cd EntertainmentHub
npm install
npm run dev
```

Open the printed local dev URL (default `http://localhost:5173`).

## Environment Notes
- OMDb API key is currently set in `src/lib/omdb.ts` (`OMDB_API_KEY`). Replace it with your own key before going public. For better security, consider moving it to an environment variable and wiring it through Vite (`import.meta.env.VITE_OMDB_API_KEY`).
- Bookmarks and auth data are stored in `localStorage`; clear it to reset.

## Available Scripts
- `npm run dev` – start the dev server.
- `npm run build` – build for production.
- `npm run preview` – preview the production build.
- `npm run lint` – run eslint.

## Project Structure (high level)
- `src/pages` – route views (Home, Movies, TV, Details, Auth, NotFound).
- `src/components` – UI primitives and layout (Shadcn + custom).
- `src/store` – Redux store and slices (auth, bookmarks, movies, tv).
- `src/lib/omdb.ts` – OMDb fetch helpers and curated trending lists.

## Authentication
Login/Signup screens use a mocked flow for now. Replace the logic in `src/pages/Login.tsx` and `src/pages/Signup.tsx` with real API calls when integrating a backend.

