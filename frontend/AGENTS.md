# Frontend Agent Instructions

## Scope

These instructions apply to work under `frontend/`.

## Environment

- Manage frontend dependencies with npm from `frontend/`.
- Keep `frontend/node_modules/`, build output, coverage, and TypeScript build info untracked.

## Commands

Install frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Run frontend tests:

```bash
npm test
```

Build the frontend:

```bash
npm run build
```

## Boundaries

- Do not use root-level npm scripts as the source of truth for frontend commands.
- Keep application changes consistent with the existing Vite React structure.