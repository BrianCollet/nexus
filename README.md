# Nexus

Nexus is a self-hostable, open-source unified infrastructure control plane for managing resources across public clouds and on-premises environments. It begins with Azure and grows toward provider-agnostic infrastructure management.

The first release helps operators discover their existing Azure estate, organize the resources that matter into projects and environments, see lightweight resource health or status context, and give the right people the right level of access.

## The Problem

Infrastructure teams work across multiple provider consoles, subscriptions, resource groups, accounts, regions, environments, and on-premises systems. That fragmentation makes it difficult to answer basic operational questions:

- What resources exist across providers and environments?
- Where are they running, and how are they organized?
- What infrastructure belongs to a product or team?
- Which environment is a resource part of?
- Who can view or manage its context?
- How does a discovered resource map to its infrastructure-as-code definition?
- Is the resource healthy, degraded, down, recently changed, or affected by a provider issue?

Nexus brings that fragmented resource picture into one place while allowing operators to retain control of their cloud accounts, credentials, and deployment environment.

## Product Vision

Nexus will become a provider-agnostic control plane for managing and understanding infrastructure across public clouds and on-premises systems. It will make infrastructure easier to find, organize, inspect, track, and eventually operate through one governed resource-management experience.

The product is guided by these principles:

- **Resources are unified first.** Nexus provides one governed inventory and management surface across providers and on-premises environments.
- **Projects provide useful organization.** Resources are organized around the products, services, systems, environments, and teams that help people operate them.
- **Environments are explicit.** Development, staging, production, and other operational boundaries are visible inside every project.
- **Access follows least privilege.** Teams can collaborate without granting broad provider-console access to everyone.
- **Self-hosting is fundamental.** Operators retain control of Nexus, its data, and its provider credentials.
- **Infrastructure should be inspectable.** Nexus makes resource metadata, lightweight status context, and supported code representations visible alongside the resource context.
- **Operational signals should have context.** Health, change, log, metric, notification, and deployment signals become more useful when they are tied to projects, environments, and owners.
- **Provider support grows incrementally.** Azure is first; multi-cloud and on-premises coverage are long-term goals.

## Initial MVP

The initial MVP is an Azure-first, read-only inventory, lightweight status, and organization experience for platform and cloud engineering teams.

### User Workflow

1. A team administrator creates an account and team workspace in Nexus.
2. The administrator invites colleagues and assigns an **Admin**, **Editor**, or **Viewer** role.
3. An Admin or Editor creates a project and its environments, such as development, staging, and production.
4. An authorized user connects Azure through delegated user access or a service principal.
5. The team browses and discovers Azure resources available to that connection.
6. An Admin or Editor imports selected resources into the appropriate project and environment.
7. Team members inspect each imported resource's metadata, lightweight health or status context, and read-only Azure Resource Manager (ARM) template view.

Importing a resource into Nexus records its organizational context. It does not modify the resource in Azure.

### MVP Capabilities

- Authentication and a dashboard for the team workspace
- Team invitations and role-based access control with Admin, Editor, and Viewer roles
- Projects with explicit environments
- Azure connections using delegated credentials or service principals
- Azure resource browsing, discovery, and import
- Imported-resource metadata and a read-only ARM template code view
- Lightweight Azure resource health or status context

### Deliberately Out of Scope

The MVP will not:

- Create, modify, delete, or deploy Azure resources
- Generate or promise deployment-ready Terraform
- Support cloud providers other than Azure or on-premises integrations
- Provide full monitoring, logging, metrics, or alerting dashboards
- Deliver customizable notifications for resource changes or outages
- Trigger Git-based deployments or CI/CD workflows
- Automate backups, updates, error aggregation, or disaster recovery
- Execute arbitrary infrastructure deployment code
- Define a custom permission builder beyond the initial Admin, Editor, and Viewer roles

## Conceptual Model

| Concept | Meaning |
| --- | --- |
| Team workspace | The shared Nexus space where users, access, projects, and provider connections are managed. |
| User | A person with access to a team workspace. |
| Role | The workspace access level: Admin, Editor, or Viewer. Detailed permissions will be defined during implementation. |
| Project | A logical grouping for infrastructure supporting a product, service, system, or team. |
| Environment | An explicit operational boundary within a project, such as development, staging, or production. |
| Provider connection | Authorized access to a cloud provider; the MVP supports Azure connections. |
| Discovered resource | An Azure resource visible through a provider connection that has not yet been organized in Nexus. |
| Imported resource | A discovered resource associated with a Nexus project and environment without being changed in Azure. |

## Security and Deployment Expectations

Nexus is intended to be self-hosted. The deploying organization controls the instance, data, and provider credentials.

Azure access will use either delegated user credentials or service principals. Nexus must operate only within the permissions granted to the corresponding Azure identity and must not expand those permissions. The identity provider, secrets-storage mechanism, audit-retention policy, and detailed role permissions remain implementation decisions.

## Roadmap

The roadmap is directional and non-binding.

1. **MVP:** Azure discovery, import, organization by project and environment, team RBAC, lightweight health or status context, and ARM inspection.
2. **Next:** Event-aware infrastructure context, including notifications, version tracking, visual dependency maps, log and metric integrations, and template generation from existing resources.
3. **Then:** Git and CI/CD visibility, defensible Azure change and provisioning workflows, and deployment-ready templates where validation, approval, and execution boundaries can be demonstrated.
4. **Later:** Additional cloud providers, on-premises inventory and management, and operational resilience integrations for backups, updates, health checks, error aggregation, and disaster recovery planning.

## Local Development

The Phase 1 application foundation includes a FastAPI backend and a Vite React frontend. Both apps read local configuration from a single root-level `.env` file.

### Prerequisites

- Python 3.11 or newer
- uv for backend Python environment management
- Node.js 20.19 or newer with npm
- Docker for future `testcontainers` backend integration tests

### Configure

Copy the example environment file before starting either app:

```bash
cp .env.example .env
```

The default local ports are:

- Backend API: `http://127.0.0.1:8000`
- Frontend dev server: `http://127.0.0.1:5173`

### Backend

Backend dependencies are managed with `uv`. Use `uv add` from the `backend/` directory to add runtime dependencies, and `uv add --dev` to add development dependencies. `uv sync --dev` creates or updates `backend/.venv` and installs the locked backend dependencies into that local virtual environment. The venv is intentionally gitignored and should remain on disk between setup runs.

Install backend dependencies:

```bash
cd backend
uv sync --dev
```

Start the FastAPI server:

```bash
uv run python -m app.cli
```

Backend checks:

- Health: `http://127.0.0.1:8000/health`
- OpenAPI docs: `http://127.0.0.1:8000/docs`
- OpenAPI schema: `http://127.0.0.1:8000/openapi.json`

### Frontend

Install frontend dependencies:

```bash
cd frontend
npm install
```

Start the React dev server:

```bash
npm run dev
```

Open `http://127.0.0.1:5173` to view the placeholder application shell. It uses `VITE_NEXUS_API_BASE_URL` from the root `.env` file to check backend health and link to API docs.

### Tests

Run backend tests:

```bash
cd backend
uv run python -m pytest
```

Run frontend tests:

```bash
cd frontend
npm test
```

Run the current unit test set from separate terminals or shell steps:

```bash
cd backend && uv run python -m pytest
cd frontend && npm test
```

Docker is required for future `testcontainers` backend integration tests. When Docker is unavailable, Docker-dependent tests must report a clear pytest skip message instead of silently passing.

QA server lifecycle commands, readiness checks, timeouts, and cleanup requirements are documented in [docs/qa-server-lifecycle.md](docs/qa-server-lifecycle.md).

## Project Status

Nexus is in its early product-definition and application-foundation stage. It is intended to be open source and self-hostable; the project license has not yet been selected.

Feedback from platform, cloud, infrastructure, and operations teams is especially valuable as the project moves toward its first implementation.