# Ship Draft

## Branch

`feature/app-foundation`

## Proposed Commit Scope

Include Phase 1 application-foundation changes only:

- Root local-development configuration and scripts: `.env.example`, `.gitignore`, `package.json`.
- FastAPI backend scaffold under `backend/`, including settings, health route, OpenAPI surface, placeholder auth/db/provider boundaries, and backend tests.
- Vite React frontend scaffold under `frontend/`, including the placeholder shell, backend health states, retry action, API docs/schema links, and frontend tests.
- Contributor and QA documentation in `README.md` and `docs/qa-server-lifecycle.md`.
- Feature artifacts under `specs/app-foundation/`.

Do not include the pre-existing user-owned modification to `specs/tech-stack.md` unless the human explicitly asks for it.

## Historic Commit

```text
feat(app): establish application foundation
```

## Proposed PR Summary

Establishes the Phase 1 Nexus application foundation with a React frontend, FastAPI backend, root-level environment configuration, contributor run documentation, and QA server lifecycle evidence.

## Validation Evidence

- `npm run test:unit` passed.
- `npm --prefix frontend run build` passed.
- Backend runtime readiness passed for `/health`, `/docs`, and `/openapi.json`.
- Frontend runtime readiness passed for `/` on `127.0.0.1:5173`.
- Backend and frontend servers were stopped after QA checks.
- Generated QA artifact paths were clean after cleanup.
- VS Code diagnostics reported no errors for `backend`, `frontend`, or `docs`.

## Ship Notes

- The original commit was amended to `feat(app): establish application foundation` to correct the non-conforming subject.
- The corrected commit was published to `origin/feature/app-foundation` with `git push --force-with-lease`.
- This historical foundation delivery remains one cohesive commit. Future Ship phases must propose an ordered group of cohesive commits when the approved changeset warrants it.