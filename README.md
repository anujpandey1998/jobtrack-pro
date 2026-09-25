# JobTrack Pro

A responsive job-application tracker built with React and Vite. It is a deployable frontend portfolio project with local data persistence.

## Features

- Add, edit, search, filter, and delete applications
- Status-based pipeline: Applied, Interview, Offer, and Rejected
- Dashboard metrics and responsive mobile layout
- Persistent browser storage: entries remain after refresh on the same device
- Accessible labels, keyboard-friendly form fields, and build-time linting

## Run locally

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```

The deployable static site is generated in `dist/`.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Import the repository at [vercel.com](https://vercel.com/new).
3. Vercel detects Vite automatically. Use `npm run build` as the build command and `dist` as the output directory.
4. Click **Deploy**.

## Deploy on Netlify

1. Push this folder to GitHub.
2. In Netlify, choose **Add new site** → **Import an existing project**.
3. Build command: `npm run build`; publish directory: `dist`.
4. Deploy the site.

## Data note

This version intentionally stores application data in the browser's `localStorage`, so it needs no backend or environment variables to host. A user's data is private to their browser and will not sync across devices. For a multi-user production product, the next step is to add authentication and a backend such as Supabase, Firebase, or a custom API.
