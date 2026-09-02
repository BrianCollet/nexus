# Backend Agent Instructions

## Scope

These instructions apply to work under `backend/`.

## Environment

- Manage the backend Python project with `uv`.
- Use `uv add <package>` from `backend/` for runtime dependencies.
- Use `uv add --dev <package>` from `backend/` for development dependencies.
- Use `uv sync --dev` from `backend/` to create or update `backend/.venv` from `pyproject.toml` and `uv.lock`.
- Keep `backend/.venv` local and untracked. It is intentionally ignored by the repository `.gitignore`.

## Commands

Install backend dependencies:

```bash
uv sync --dev
```

Start the backend API:

```bash
uv run python -m app.cli
```

Run backend tests:

```bash
uv run python -m pytest
```

## Boundaries

- Do not use the root `package.json` for backend lifecycle commands.
- Do not commit virtual environment files, cache directories, coverage output, or generated QA artifacts.