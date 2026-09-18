# Production Control Dashboard

A small factory operations dashboard for tracking production jobs, machine assignments, and issues that need attention.

Built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **lucide-react**.

## Features

- **Summary metrics** — total jobs, delayed jobs, due today/soon, completed
- **Work orders table** — job ID, product, customer, quantity, due date, status, machine
- **Search** — by product name, customer, or job ID
- **Filters & sorting** — status filter; sort by due date or quantity
- **Pagination** — 5 jobs per page with prev/next controls
- **Job detail panel** — side sheet with notes, issues, machine status, and status updates
- **Hardcoded mock data** — jobs load from `getHardcodedJobs()` (no backend/API)

## Getting started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm 9+

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Deploy (Vercel)

1. Push this project to a GitHub repository
2. Import the repo in [Vercel](https://vercel.com/new)
3. Use the defaults (Next.js is auto-detected)
4. Deploy — no environment variables are required

Or with the Vercel CLI:

```bash
npx vercel
```

## Project structure

```
src/
  app/
    layout.tsx            # Root layout
    (dashboard)/          # Dashboard route group (isolated feature)
      page.tsx            # `/` entry + dashboard state/UI
      _components/        # Dashboard-only child components
  components/
    header.tsx            # Global header
    footer.tsx            # Global footer
    pagination.tsx        # Global pagination
    ui/                   # shadcn/ui primitives (incl. table)
  data/jobs.ts            # Hardcoded mock work orders + getHardcodedJobs()
  lib/                    # Filtering and metrics helpers
  types/job.ts            # Shared TypeScript types
```

## Data

Work orders come from hardcoded mock data in `src/data/jobs.ts` via `getHardcodedJobs()`.
Status updates stay in React state for the current session. Refresh resets back to the hardcoded seed data.

## Tech notes

- UI components come from **shadcn/ui** only
- Icons come from **lucide-react** only
- No authentication, database, API routes, or external chart/table libraries

## License

Private assignment submission.
