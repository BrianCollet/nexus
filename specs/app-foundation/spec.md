---
slug: "app-foundation"
track: "Cross-cutting"
roadmap_phase: "Phase 1: Product and Application Foundation"
acceptance_criteria: []
critical_journeys: []
dependencies: []
gates:
  spec: "approved"
  plan: "approved"
  design: "approved"
  tasks: "approved"
  implement: "approved"
  ux_review: "approved"
  qa: "approved"
  ship: "complete"
orchestration:
  qa_remediation_cycles: 0
  confirmed_branch: "feature/app-foundation"
  reopen_from: ""
---

# Feature Spec

## Problem

The repository currently contains only product and technical specification documents. There is no React frontend, no FastAPI backend, no local development workflow, and no documented way to run or extend the application. Every subsequent roadmap phase — authentication and workspace membership (Phase 2), projects/environments/RBAC (Phase 3), Azure connection and discovery (Phase 4), and beyond — depends on a working application skeleton with a real API surface, a real frontend shell, and a documented local dev loop.

Without this foundation:

- There is no place to add authentication, RBAC, or Azure integration code.
- There is no documented way for a contributor to run the project, so no other feature can be implemented, tested, or reviewed.
- QA has no server-lifecycle contract to follow, which blocks the AGENTS.md requirement that QA start/stop the frontend and backend deterministically during evidence runs.
- There is no configuration model for self-hosted operation, which the mission and tech-stack docs require from the start.

This feature exists to remove that blocker by establishing the minimal, self-hosted-ready application skeleton and its local dev workflow, without building any Phase 2+ product capability.

## Goals

- Stand up a minimal React frontend application skeleton (project scaffold, build tooling, a single landing/placeholder view) that runs via a documented local dev command.
- Stand up a minimal Python/FastAPI backend application skeleton (project scaffold, app entrypoint, routing structure) that runs via a documented local dev command.
- Provide a shared local development workflow: documented commands to install dependencies and start the frontend and backend independently (and, if applicable, together) for local development.
- Provide an initial, environment-driven configuration model for self-hosted deployments: a single root-level `.env` file (with a committed `.env.example`) covering backend host/port, CORS origins, and the frontend API base URL, consumed by both apps without duplication — the backend reads it directly and the frontend's Vite dev server points its `envDir` at the repository root — consistent with the self-hosting principle in mission.md and the single-root-`.env` guardrail in tech-stack.md.
- Implement basic health-check endpoint(s) on the backend (e.g. `GET /health`) that report application liveness.
- Expose a documented OpenAPI/API surface (FastAPI's generated docs, e.g. `/docs` and `/openapi.json`) so the backend's API structure is discoverable from day one.
- Author initial contributor-facing documentation (README and/or `docs/`) covering prerequisites, install steps, and how to run the frontend and backend locally.
- Author the QA server-lifecycle documentation required by AGENTS.md's "QA server lifecycle policy": the exact commands to start and stop the frontend and backend for QA runs, the ports each service listens on, the readiness check(s) QA must poll before proceeding, the readiness timeout, and the cleanup steps QA must perform afterward (including confirming no generated traces, coverage output, or test-results artifacts remain).
- Document that Docker is required for `testcontainers`-based backend integration tests, and that those tests must skip loudly with a clear, visible report (not a silent pass) when Docker is unavailable.
- Establish enough project structure (frontend app directory, backend app directory, service-layer placeholder pattern in the backend) that persistence, authentication, and Azure integration can be added in later phases without restructuring the skeleton.

## Non-Goals

- No authentication, session, or JWT implementation of any kind (Phase 2).
- No RBAC, roles, or authorization checks (Phase 2/3).
- No team workspace, invitation, membership, project, or environment domain models (Phase 2/3).
- No Azure connection, credential storage, discovery, import, or ARM inspection (Phase 4/5).
- No real persistence schema or database migrations beyond, at most, a minimal placeholder needed to prove the backend can talk to a database connection string from configuration; no domain tables (users, workspaces, projects, resources, etc.) are created in this feature.
- No notification system, event history, or observability integrations.
- No template generation, visual dependency maps, or version tracking.
- No Git/CI/CD visibility or deployment orchestration features.
- No production deployment packaging decision (Docker Compose/Kubernetes/Helm) beyond what is needed to state a clear future path; that decision belongs to Phase 6 (Self-Hosting Hardening).
- No UI design system, visual polish, or non-placeholder frontend views — the frontend skeleton exists to prove the dev workflow and API connectivity, not to deliver product UI.

## Acceptance Criteria

- Running a single documented command installs backend dependencies and starts the FastAPI backend on a documented port.
- `GET /health` (or the documented health route) returns HTTP 200 with a machine-readable body once the backend is running.
- The backend's OpenAPI documentation is reachable at a documented route (e.g. `/docs`) once the backend is running.
- Running a single documented command installs frontend dependencies and starts the React dev server on a documented port.
- The frontend dev server serves a placeholder page without errors and without requiring any backend feature beyond the health check.
- Backend and frontend configuration (host, port, CORS origins, the frontend API base URL, and any other environment-driven values) is read from a single root-level `.env` file — the backend reads it directly and the frontend's Vite dev server reads it via `envDir` pointed at the repository root, with no per-app `.env` duplication — and a documented root-level `.env.example` is committed to the repo.
- The README (and/or linked docs) documents prerequisites, install steps, and the exact commands to run the frontend and backend locally, matching what a fresh clone actually requires.
- A documented section (in README, AGENTS.md-linked docs, or a dedicated QA doc) states, for QA's use: the exact start/stop commands for the frontend and backend, their ports, the readiness check(s) to poll, the readiness timeout value, and the cleanup steps to confirm no generated traces/coverage/test-results artifacts remain.
- Documentation explicitly states that Docker is required for `testcontainers`-based backend integration tests, and that those tests must skip with a clear, visible report (not silently pass) when Docker is unavailable.
- The backend project structure includes a clear, empty-but-real place to add persistence (e.g. a `models`/`db` layer with a placeholder connection setup), authentication (e.g. a placeholder auth module or dependency), and Azure integration (e.g. a placeholder provider-integration package), so later phases have an obvious location to add code without restructuring.

## Critical Journeys

- **Developer first run:** a developer clones the repository, follows the documented steps to install dependencies, starts the backend and frontend using the documented commands, confirms the backend health check and OpenAPI docs are reachable, and confirms the frontend dev server loads its placeholder page — all without needing to guess at undocumented steps.
- **Contributor exploring the API:** a contributor who wants to add a new endpoint opens the documented OpenAPI surface to understand the current API structure before writing new routes.
- **Operator reviewing the config model:** an operator evaluating self-hosting reviews the documented environment-driven configuration (the root `.env.example` file and README guidance) to understand what values they will need to set for their own deployment, without needing to read source code.
- **QA running server lifecycle:** QA starts the frontend and backend using the documented commands and ports, waits for the documented readiness checks within the documented timeout, runs its evidence collection, then stops both services and confirms no generated artifacts remain in the repo, per the QA server lifecycle policy in AGENTS.md.

## Notes
