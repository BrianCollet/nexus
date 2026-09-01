# Tasks

## Dependency-Ordered Work

- [ ] Task 1: Establish repository-level app tooling and configuration
  - Add root scripts or documented commands for installing/running frontend and backend dependencies.
  - Add `.env.example` at the repository root with backend host/port, CORS origins, frontend API base URL, environment name/app mode, and optional database URL placeholder.
  - Ensure no per-app `.env` files are introduced.
  - Test: Fresh checkout path can copy `.env.example` to `.env`; config values are consumed from the root env location by both apps.

- [ ] Task 2: Scaffold the FastAPI backend foundation
  - Create `backend/` with Python project metadata and app package structure.
  - Add `backend/app/main.py`, API router structure, settings loader, service layer placeholder, auth placeholder, db placeholder, and provider placeholder.
  - Implement `GET /health` with HTTP 200 and a machine-readable response.
  - Preserve FastAPI-generated `/docs` and `/openapi.json` routes.
  - Test: Backend starts on the documented host/port; `GET /health` returns 200; `/docs` and `/openapi.json` are reachable.

- [ ] Task 3: Add backend tests for the foundation API
  - Add focused unit/API tests for the health endpoint and app metadata/schema availability.
  - Add a visible integration-test placeholder or marker documenting that Docker is required for future `testcontainers` runs and unavailable Docker must skip loudly.
  - Test: Backend test command passes and reports any Docker-dependent integration tests clearly when skipped.

- [ ] Task 4: Scaffold the Vite React frontend foundation
  - Create `frontend/` with Vite + React + TypeScript project metadata and source structure.
  - Configure Vite `envDir` to read env values from the repository root.
  - Add a placeholder application shell that displays backend health status and links to backend docs/schema using the configured API base URL.
  - Include loading, empty/foundation, error, and success states with a retry action.
  - Test: Frontend dev server starts on the documented port and renders the placeholder shell without console/runtime errors.

- [ ] Task 5: Add frontend tests for the placeholder shell
  - Add a narrow component or app test that covers loading/success/error health states and the retry action.
  - Verify docs and schema links are derived from the configured backend URL.
  - Test: Frontend test command passes for the placeholder app shell.

- [ ] Task 6: Document contributor local development workflow
  - Update `README.md` with prerequisites, install steps, root env setup, backend command, frontend command, health check URL, OpenAPI docs URL, and expected ports.
  - Keep documentation aligned with actual scripts and package metadata.
  - Test: A contributor can follow the README commands from a fresh checkout to start both services independently.

- [ ] Task 7: Document QA server lifecycle
  - Add `docs/qa-server-lifecycle.md` covering exact frontend/backend start commands, stop commands, ports, readiness checks, readiness timeout, cleanup steps, and generated-artifact checks.
  - Include the AGENTS.md-required statement that Docker is required for `testcontainers` backend integration tests and those tests must skip loudly when Docker is unavailable.
  - Test: QA lifecycle documentation contains all required fields and matches implemented commands/ports.

- [ ] Task 8: Run foundation verification and clean generated artifacts
  - Run backend tests, frontend tests, backend startup/health/API-doc checks, and frontend startup/render checks.
  - Confirm no generated traces, coverage output, or test-results artifacts remain in the repository after cleanup.
  - Test: Final evidence commands pass or any environment limitation is explicitly recorded for QA follow-up.

## Traceability

- Acceptance criterion: Running a documented backend command starts FastAPI on a documented port -> Tasks 1, 2, 6, 8; evidence from backend startup command and README.
- Acceptance criterion: `GET /health` returns HTTP 200 with a machine-readable body -> Tasks 2, 3, 8; evidence from backend tests and readiness check.
- Acceptance criterion: Backend OpenAPI documentation is reachable -> Tasks 2, 3, 6, 8; evidence from `/docs` and `/openapi.json` checks.
- Acceptance criterion: Running a documented frontend command starts React on a documented port -> Tasks 1, 4, 6, 8; evidence from frontend startup command and README.
- Acceptance criterion: Frontend serves a placeholder page without requiring backend features beyond health -> Tasks 4, 5, 8; evidence from frontend tests and local render check.
- Acceptance criterion: Backend and frontend config use one root `.env` and committed `.env.example` -> Tasks 1, 2, 4, 6; evidence from settings loader, Vite config, and docs.
- Acceptance criterion: README documents prerequisites, install steps, and exact run commands -> Task 6; evidence from README review.
- Acceptance criterion: QA lifecycle documentation states commands, ports, readiness, timeout, cleanup, and artifact checks -> Task 7; evidence from `docs/qa-server-lifecycle.md`.
- Acceptance criterion: Docker/testcontainers behavior is documented as loud skip when unavailable -> Tasks 3, 7; evidence from backend test marker/placeholder and QA docs.
- Acceptance criterion: Backend structure has stable locations for persistence, auth, and Azure/provider integration -> Task 2; evidence from backend package structure.