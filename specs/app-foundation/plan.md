# Plan

## Technical Approach

Build the application foundation as a small monorepo-style web app with separate `frontend/` and `backend/` directories and repo-root documentation/configuration.

- Use Vite + React + TypeScript for the frontend skeleton.
- Use FastAPI for the backend skeleton, with route modules kept thin and service/provider/config boundaries present from day one.
- Use a single root `.env` file for local configuration, committed as `.env.example`; the backend loads it directly and the Vite config points `envDir` at the repository root.
- Keep the frontend placeholder operational rather than product-complete: it should render the Nexus application shell and show backend health/API connectivity without introducing auth, RBAC, workspace, project, or Azure workflows.
- Keep the backend API intentionally small: application metadata and liveness only, plus FastAPI's generated `/docs` and `/openapi.json` surfaces.
- Add contributor and QA lifecycle documentation as part of the foundation, because later phases depend on deterministic run and evidence commands.

Suggested directory shape:

```text
backend/
  app/
    api/
      routes/
    auth/
    config/
    db/
    providers/
    services/
    main.py
  tests/
    unit/
    integration/
  pyproject.toml
frontend/
  src/
    app/
    api/
    main.tsx
  package.json
  vite.config.ts
docs/
  qa-server-lifecycle.md
.env.example
README.md
```

## Data Model

No product data model is introduced in this phase.

The backend should include placeholder modules for future persistence without defining domain tables:

- `backend/app/db/` for connection/session setup stubs.
- `backend/app/auth/` for future request-auth dependencies.
- `backend/app/providers/` for provider integration boundaries, including a placeholder Azure package/module.
- `backend/app/services/` for service-layer functions called by route handlers.

Configuration is the only structured model required now. It should include at least:

- backend host and port,
- allowed CORS origins,
- frontend API base URL,
- optional environment name or app mode,
- optional database URL placeholder for future persistence wiring.

## Integration Points

- Frontend to backend: the frontend reads the API base URL from root-managed Vite env and calls the backend health endpoint.
- Backend to OpenAPI: FastAPI exposes generated API docs at `/docs` and schema at `/openapi.json`.
- Backend configuration: settings are loaded from the root `.env` file with sensible local defaults and `.env.example` documentation.
- QA lifecycle: documentation defines how QA starts/stops each server, polls readiness, times out, and checks cleanup.
- Future persistence/auth/Azure: placeholder packages create stable destinations for Phase 2+ work without implementing those capabilities.

## Route-to-Role Matrix

No authenticated roles exist in Phase 1. All Phase 1 endpoints are unauthenticated development/bootstrap endpoints only.

| Route | Method | Allowed Roles | Notes |
| --- | --- | --- | --- |
| `/health` | `GET` | Public | Liveness/readiness signal for local dev and QA server lifecycle. |
| `/docs` | `GET` | Public | FastAPI-generated OpenAPI UI for local development. |
| `/openapi.json` | `GET` | Public | FastAPI-generated API schema for local development. |

## Constraints and Guardrails

- Do not implement authentication, JWT sessions, users, memberships, roles, projects, environments, Azure connections, resource discovery, imports, ARM inspection, or persistence domain tables.
- The backend is the future source of truth for permissions; the frontend must not encode authorization behavior in this phase.
- Use one root-level `.env` file only; do not add per-app `.env` files.
- Keep provider operations read-only by policy, and do not add Azure SDK calls in this foundation feature.
- Document Docker as required for future `testcontainers` backend integration tests; those tests must skip loudly with a visible report when Docker is unavailable.
- Document exact QA server commands, ports, readiness checks, timeout, cleanup commands, and generated-artifact checks.
- Avoid production deployment packaging decisions beyond preserving a clear future path for self-hosted operation.