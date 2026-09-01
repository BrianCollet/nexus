# Design

## UI State Matrix

The Phase 1 frontend is a placeholder application shell, not a product workflow. It should make the local development loop and backend connectivity visible without introducing authentication, workspace, project, provider, or resource-management concepts before their roadmap phases.

| State | Description | Component Primitives |
| --- | --- | --- |
| Loading | The frontend is checking the backend health endpoint after the app loads. | Application shell, status region, loading text or progress primitive. |
| Empty | No product data is expected in Phase 1; the shell explains only that the application foundation is running. | Static shell content, API/docs links, local environment summary. |
| Error | The frontend cannot reach the backend health endpoint or receives a non-success response. | Error status region, backend URL display, retry button, docs guidance link. |
| Success | The backend health endpoint returns HTTP 200 and machine-readable status. | Success status region, backend status fields, links to `/docs` and `/openapi.json`. |

## Interaction Model

- On initial load, the frontend calls the configured backend health route.
- The health status area should clearly distinguish `checking`, `available`, and `unavailable` states.
- The user can retry the health check without refreshing the page.
- Links to backend API docs should use the configured backend base URL.
- No navigation, authentication controls, workspace switchers, project lists, Azure setup flows, or resource tables are introduced in this phase.

## Visual Direction

- Use a quiet operational workspace style suitable for an infrastructure control plane, not a marketing landing page.
- Keep the first screen focused on whether the app foundation is running locally.
- Favor dense, readable layout primitives that can later grow into dashboard and resource-management surfaces.
- Avoid a full design system in this phase; use a small set of reusable CSS classes or components only where they reduce repetition.
- The placeholder screen should be responsive across desktop and mobile and should not rely on the backend for any data beyond the health response.

## Accessibility and Responsiveness

- Health status changes should be exposed through readable text, not color alone.
- The retry action should be keyboard accessible.
- API documentation links should have descriptive link text.
- Layout should remain usable at mobile widths without horizontal scrolling.

## Style Review

- Result: Approved for the Phase 1 foundation scope.
- Evidence: The implemented shell presents loading, success, and error health states; exposes a keyboard-accessible retry action; links to backend API docs and schema from the configured base URL; and remains limited to local foundation status without authentication, workspace, project, Azure, or resource-management UI.
- Suggestion: In the next product-facing frontend phase, introduce durable navigation and workspace layout primitives before adding domain-heavy views.
- Nit: The current typography and panel styling are acceptable for a foundation placeholder, but should be revisited when the real workspace dashboard establishes the long-lived visual system.