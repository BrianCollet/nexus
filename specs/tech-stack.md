# Tech Stack

This document records the initial technical direction for Nexus. It is intentionally practical: decisions here should make the MVP easier to build, self-host, secure, and evolve without expanding the product beyond the mission in [mission.md](mission.md).

## Core Decisions

| Area | Decision | Rationale |
| --- | --- | --- |
| Frontend | React | Nexus needs a responsive workspace UI for browsing, organizing, and inspecting infrastructure. React is a mature default with broad ecosystem support. |
| Backend | Python with FastAPI | FastAPI provides a concise API layer, strong typing support, OpenAPI generation, and a good fit for integration-heavy backend services. |
| Authentication | JWT-based application authentication | JWTs provide a portable mechanism for API authentication between the browser and backend once a Nexus user session is established. |
| First provider | Azure | The MVP is Azure-first and should focus on high-quality discovery, import, and ARM inspection before adding other providers. |
| Hosting model | Self-hosted | Operators must control the Nexus instance, data, credentials, and deployment environment. |
| MVP behavior | Read-only provider operations with lightweight health/status context | The first release must not create, modify, delete, or deploy Azure resources. Health and status signals should be informational. |

## Application Shape

Nexus should start as a small, modular web application with clear boundaries between resource management workflows, authorization, provider integration, and persistence.

The expected high-level components are:

- **React frontend:** workspace UI for authentication, invitations, projects, environments, provider discovery, imported-resource views, and ARM inspection.
- **FastAPI backend:** HTTP API for workspace operations, RBAC enforcement, Azure connection management, discovery, import, and resource inspection.
- **Persistence layer:** durable storage for users, workspaces, roles, projects, environments, provider connections, discovered-resource snapshots, and imported-resource records.
- **Provider integration layer:** Azure-specific integration code isolated behind provider abstractions so future providers can be added deliberately.
- **Status and event layer:** provider health/status lookups for the MVP, with room for post-MVP event history, notification rules, and change tracking.
- **Credential handling layer:** storage and retrieval of provider credentials or delegated tokens according to the self-hosted deployment model.

## Frontend

The frontend should use React to build the Nexus workspace experience.

The initial UI should prioritize operational clarity over marketing presentation:

- Workspace dashboard.
- Team invitation and role management views.
- Project and environment management views.
- Azure connection setup and status views.
- Resource discovery and import workflows.
- Imported-resource detail pages with metadata, lightweight health/status context, and read-only ARM template inspection.

Frontend code should treat the backend API as the source of truth for permissions. UI affordances may hide unavailable actions, but the backend must enforce all authorization decisions.

## Backend

The backend should use Python with FastAPI.

FastAPI should own:

- API routing and request validation.
- Workspace, user, invitation, project, environment, and resource endpoints.
- JWT validation and session-aware request handling.
- Role-based access checks for Admin, Editor, and Viewer operations.
- Azure discovery and import orchestration.
- Lightweight Azure health and status retrieval.
- Read-only ARM template retrieval or representation generation.

Provider-specific code should be kept out of route handlers where possible. Routes should call service-layer functions that can later support additional providers without rewriting the API surface.

## Authentication and Authorization

Nexus should use JWT-based application authentication for browser-to-API requests.

The MVP authorization model is role-based:

- **Admin:** manages workspace settings, users, invitations, provider connections, projects, environments, and imports.
- **Editor:** creates and manages projects, environments, and imports where permitted.
- **Viewer:** reads project, environment, imported-resource, and metadata context without making organizational changes.

The detailed permission matrix remains an implementation decision, but all backend mutations must be guarded by explicit role checks.

Open authentication decisions:

- Whether the first implementation uses local accounts only, an external identity provider, or both.
- Whether OIDC or SAML should be required for self-hosted enterprise deployments.
- Token lifetime, refresh-token handling, revocation behavior, and session storage details.

## Azure Integration

Azure integration must operate only within the permissions granted to the delegated user or service principal configured by the operator.

The Azure layer should support:

- Connecting Azure through delegated user access or service principals.
- Listing subscriptions, resource groups, and resources visible to the connection.
- Capturing discovered-resource metadata for review.
- Importing selected discovered resources into Nexus project and environment organization without changing Azure.
- Fetching lightweight resource health or status context for discovered and imported resources.
- Presenting read-only Azure Resource Manager template views or supported ARM representations.

The MVP must not perform Azure resource create, update, delete, deployment, or arbitrary execution operations.

Open Azure decisions:

- Azure SDK for Python versus direct ARM REST calls.
- API versions and resource coverage for initial discovery.
- Whether MVP health/status uses Azure Resource Health, Azure Service Health, provider activity signals, or a small combination.
- Pagination, throttling, retry, and partial-failure behavior for large estates.
- How frequently discovered-resource data is refreshed or cached.

## Observability and Event Direction

Nexus should use a hybrid observability model.

For the MVP, Nexus should show lightweight health or status context from provider APIs or explicit provider status feeds. This information should help teams notice degraded, down, unavailable, or provider-affected resources without turning Nexus into a full monitoring platform.

After the MVP, Nexus should integrate with existing observability systems first and add native storage only where Nexus needs ownership of the data for governance, history, notification rules, resource version tracking, or audit trails.

Planned observability capabilities include:

- Provider health and status checks for imported resources.
- Community outage signals, such as Down Detector-style sources, as contextual warnings rather than authoritative resource state.
- Custom notification rules for resource modified, deleted, down, degraded, recovered, or otherwise changed events.
- Notification delivery adapters such as webhooks, email, chat tools, and incident-management systems.
- Log inspection integrations that link external logs to Nexus projects, environments, and resources.
- CPU, memory, disk, and network utilization views through cloud-provider metric APIs or external monitoring integrations.
- Error and log aggregation integrations for Nexus itself and for connected infrastructure where explicitly configured.

Open observability decisions:

- Polling versus event-driven ingestion for health, changes, and metrics.
- Whether community outage signals can trigger notifications or only appear as contextual warnings.
- Which notification channels are first-class versus webhook-only.
- Retention periods for Nexus-owned event history.
- Whether metric and log data is cached in Nexus or queried on demand from external systems.

## Templates, Visuals, and Version Tracking

Nexus should make infrastructure easier to understand before it makes infrastructure easier to change.

Template generation should mature in three levels:

1. **Documentation and inspection templates:** read-only representations generated from existing resources for understanding and review.
2. **Validated export artifacts:** parameterized templates that can support migration or review workflows after fidelity is tested.
3. **Deployment-ready templates:** templates intended for execution only after validation, approval, drift, rollback, and authorization boundaries are designed.

Template parameterization should use project and environment context where appropriate, including subscription ID, resource group, location, tags, naming inputs, and environment-specific values.

Visual infrastructure maps should be generated from provider metadata, imported-resource relationships, dependency discovery, and explicit user annotations. These maps should behave like living system design documents tied to real resources.

Version tracking should preserve meaningful changes to Nexus-owned context and provider-observed resource state, including imports, metadata refreshes, detected provider changes, template representation changes, Git mapping changes, and deployment history where configured.

Open template and versioning decisions:

- ARM-first versus Terraform-first export maturity.
- How template fidelity is tested and communicated.
- How to represent unsupported or partially supported resources.
- Whether version history stores full snapshots, diffs, or both.
- How visual dependency maps handle ambiguous or inferred relationships.

## Git, CI/CD, and Deployment Integration

Nexus should support Git and CI/CD in stages.

The first stage should be visibility and audit:

- Link imported resources to repositories, directories, files, pull requests, pipelines, and releases.
- Show which Git or CI/CD workflow last changed a resource when that information is available.
- Correlate provider activity, Nexus imports, template versions, and deployment events.
- Preserve a read-only audit trail without triggering deployments.

The later stage may add controlled orchestration:

- Git-based deployment requests.
- CI/CD trigger integrations.
- Review and approval workflows.
- Policy checks before execution.
- Least-privilege execution identities.
- Rollback and failure-handling guidance.

Open Git and deployment decisions:

- Supported Git providers and CI/CD systems.
- Whether Nexus writes pull requests, triggers existing pipelines, or runs its own deployment workers.
- How deployment permissions are separated from inventory and inspection permissions.
- Required audit data for proposed, approved, executed, failed, and rolled-back changes.

## Operational Resilience

Nexus itself should be operable as self-hosted infrastructure.

Operational resilience capabilities should include:

- Backup and restore guidance for Nexus data.
- Update and migration guidance for the application and database.
- Health checks for Nexus services and provider integrations.
- Notifications for Nexus system health where configured.
- Error and log aggregation for Nexus application components.
- Disaster recovery planning guidance for Nexus deployments.

These features should help operators run Nexus reliably without implying that Nexus owns disaster recovery for every connected resource.

## Persistence

Nexus needs durable relational data for workspace and infrastructure organization concepts. PostgreSQL is the recommended default for the MVP unless implementation constraints prove otherwise.

The persistence layer should represent at least:

- Team workspaces.
- Users and memberships.
- Invitations.
- Roles and permissions.
- Projects.
- Environments.
- Provider connections.
- Discovered-resource snapshots.
- Imported resources and their project/environment associations.

Open persistence decisions:

- ORM and migration tooling.
- Exact resource snapshot schema.
- Retention policy for discovered resources that are not imported.
- Whether a single Nexus instance supports one workspace or many workspaces.

## Secrets and Credentials

Self-hosting means operators own credential storage decisions. Nexus must avoid assuming that provider credentials can leave the deployed instance.

The implementation should support secure storage for service principal secrets and delegated tokens, with an upgrade path for external secret stores.

Open credential decisions:

- Local encrypted database storage versus integration with external secret managers.
- Key management model for self-hosted deployments.
- Rotation workflows for service principal credentials.
- Audit records for credential creation, update, and use.

## Deployment

Nexus should be designed for self-hosted deployment from the beginning.

The initial packaging target remains open, but implementation should keep these constraints visible:

- The frontend and backend should be deployable together for simple installations.
- Configuration should be environment-driven.
- Operators should be able to control network exposure, TLS termination, database location, and credential storage.
- Production deployments should have a clear path to backups, upgrades, and secret rotation.

Open deployment decisions:

- Docker Compose, Kubernetes, Helm, standalone containers, or another first packaging target.
- Default reverse proxy and TLS guidance.
- Backup and restore strategy.
- Observability requirements for Nexus itself.

## Technical Guardrails

- Keep Azure-specific behavior behind provider boundaries.
- Treat backend authorization as mandatory, even when the frontend hides actions.
- Preserve the read-only MVP boundary in provider integration code.
- Keep MVP health/status informational and non-mutating.
- Prefer integration-first observability for logs and metrics; store native events only when Nexus owns the workflow or history.
- Separate template maturity levels: inspection, validated export, and deployment-ready output.
- Treat Git and CI/CD visibility as a prerequisite for controlled deployment orchestration.
- Prefer explicit data models over provider-specific metadata blobs when Nexus owns the concept.
- Keep deployment and credential assumptions compatible with self-hosted operation.
- Avoid adding multi-cloud abstractions before the Azure MVP proves the workflow.

See [roadmap.md](roadmap.md) for the order in which these decisions should be implemented.