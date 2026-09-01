# QA Server Lifecycle

This document defines the deterministic server lifecycle QA must use for the Phase 1 application foundation.

## Services

| Service | Default port | Start command | Readiness check | Stop command |
| --- | --- | --- | --- | --- |
| Backend | `8000` | `npm run dev:backend` | `curl http://127.0.0.1:8000/health` returns HTTP 200 with JSON status | Stop the foreground process with `Ctrl+C` |
| Frontend | `5173` | `npm run dev:frontend` | `curl http://127.0.0.1:5173/` returns HTTP 200 | Stop the foreground process with `Ctrl+C` |

Use `npm run dev:backend:setup` and `npm run dev:frontend:setup` when dependencies have not been installed yet.

## Readiness Timeout

QA must wait up to 30 seconds for each service to become ready. If either readiness check does not pass within 30 seconds, record the startup failure as Blocking evidence and stop the run.

## Cleanup

After evidence collection:

1. Stop the frontend process.
2. Stop the backend process.
3. Confirm the backend port is closed: `curl http://127.0.0.1:8000/health` should fail to connect.
4. Confirm the frontend port is closed: `curl http://127.0.0.1:5173/` should fail to connect.
5. Confirm no generated QA artifacts remain in the repository: `git status --short -- traces coverage test-results playwright-report` should show no tracked or untracked artifacts.

## Docker and Testcontainers

Docker is required for future backend integration tests that use `testcontainers`. If Docker is unavailable, those tests must skip loudly with a clear pytest skip message instead of silently passing.