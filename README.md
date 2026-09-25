# FitLog — Workout Library

A responsive, dark-themed workout library and training log built with Next.js. Browse exercises, view workout details, save movements, and manage a daily plan of up to five lifts.

## Technologies

- Next.js 14 (App Router) and React
- TypeScript
- Tailwind CSS
- Context API and React hooks
- FitLog REST API
- localStorage for persistence
- lucide-react icons and react-hot-toast notifications

## Features

1. Responsive home page with hero banner and workout library.
2. Fetches workouts from the FitLog API and displays loading/error states.
3. Dynamic workout detail pages with specs and instructions.
4. Add up to five exercises to today's plan; save exercises for later.
5. My Plan dashboard with live exercise/minute/calorie metrics.
6. Mark exercises done, remove entries, search and sort.
7. localStorage persistence across reloads.
8. Custom 404 page and client-side toast feedback.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```
