# Roadmap

This roadmap is phase-based and ordered by implementation dependency. It does not define dates or release commitments.

The roadmap should be read with [mission.md](mission.md) and [tech-stack.md](tech-stack.md). The mission defines the product boundaries; the tech stack defines the initial implementation direction.

## Phase 1: Product and Application Foundation

Status: Complete

Completed features:

- [app-foundation](app-foundation/spec.md)

Establish the repository and application skeleton needed to build Nexus as a self-hosted web application.

Primary outcomes:

- React frontend application foundation.
- Python/FastAPI backend application foundation.
- Shared development workflow for running the frontend and backend locally.
- Initial configuration model for self-hosted deployments.
- Basic health checks and API structure.
- Initial documentation for contributors and operators.

Completion criteria:

- A developer can run the frontend and backend locally.
- The backend exposes a documented API surface.
- The project has a clear path for adding persistence, authentication, and Azure integration.

## Phase 2: Authentication and Team Workspace

Build the first usable Nexus workspace experience.

Primary outcomes:

- User registration or administrator bootstrap flow.
- JWT-based application authentication.
- Team workspace creation.
- Invitation workflow.
- Membership management.
- Initial Admin, Editor, and Viewer role model.

Completion criteria:

- A team administrator can create or initialize a workspace.
- Users can authenticate and access the workspace according to their membership.
- Admins can invite users and assign one of the MVP roles.

## Phase 3: Projects, Environments, and RBAC

Add the organizational model for managing resources across projects and environments.

Primary outcomes:

- Project creation and management.
- Environment creation and management within projects.
- Role-based authorization checks for workspace, project, and environment actions.
- Viewer-safe read paths for project and environment context.

Completion criteria:

- Admins and Editors can create and manage projects and environments.
- Viewers can inspect allowed resource context without mutating it.
- Backend authorization protects all project and environment mutations.

## Phase 4: Azure Connection, Discovery, and Lightweight Status

Connect Nexus to Azure in read-only mode, make visible resources discoverable, and show lightweight health or status context.

Primary outcomes:

- Azure provider connection model.
- Service principal connection support.
- Delegated user access support, if selected for the first Azure implementation.
- Resource discovery across visible Azure scopes.
- Lightweight Azure resource health or status context from provider APIs or explicit provider status feeds.
- Discovery result browsing in the workspace UI.
- Handling for Azure permission errors, pagination, throttling, and partial failures.

Completion criteria:

- An authorized user can connect Azure using supported credentials.
- Nexus can list Azure resources visible to that connection.
- Nexus can show basic health or status context for supported Azure resources without presenting itself as a full monitoring platform.
- Discovery does not create, modify, delete, deploy, or execute Azure resources.

## Phase 5: Resource Import and ARM Inspection

Allow users to attach discovered Azure resources to Nexus project and environment context.

Primary outcomes:

- Import workflow from discovered resources into projects and environments.
- Imported-resource records that preserve Azure identity and Nexus context.
- Imported-resource metadata views.
- Read-only Azure Resource Manager template view or supported ARM representation.
- Clear distinction between discovered resources and imported resources.

Completion criteria:

- Admins and Editors can import selected discovered resources into a project and environment.
- Importing records organizational context only and does not modify Azure.
- Team members can inspect imported-resource metadata and ARM views according to their role.

## Phase 6: Self-Hosting Hardening

Prepare the MVP for real self-hosted operation.

Primary outcomes:

- Chosen deployment packaging path.
- Production configuration guidance.
- Database migration workflow.
- Credential storage guidance.
- Backup and restore guidance.
- Audit-relevant records for important workspace and provider actions.
- Operational documentation for upgrades and environment configuration.

Completion criteria:

- Operators can deploy Nexus in a controlled environment.
- Provider credentials and Nexus data remain under operator control.
- The MVP has documented backup, restore, and upgrade expectations.

## Phase 7: Observability Foundation

Add event-aware infrastructure context after the core import and inspection workflow works end to end.

Primary outcomes:

- Resource status model that can represent healthy, degraded, down, unavailable, unknown, and provider-affected states.
- Integration points for cloud-provider health APIs and explicit provider status feeds.
- Contextual community outage signals, such as Down Detector-style sources, where reliable integration is available.
- Initial log and metric integration design for external observability systems.
- Event model for resource changes, health changes, and Nexus-owned audit records.

Completion criteria:

- Health and outage signals are tied to projects, environments, and imported resources.
- External signals are labeled by source and confidence.
- Nexus remains integration-first for logs and metrics rather than becoming a full monitoring data store by default.

## Phase 8: Notifications and Event History

Turn health and change signals into user-configurable awareness.

Primary outcomes:

- Notification rule model for resource modified, deleted, down, degraded, recovered, and provider-affected events.
- Notification delivery adapters for selected channels.
- Event history for Nexus-owned resource, health, notification, and audit events.
- Role-aware notification configuration.
- Retention policy for event history.

Completion criteria:

- Users can configure notifications for important resource and status changes.
- Event history supports review without requiring broad provider-console access.
- Notification delivery does not grant recipients permissions they do not already have in Nexus.

## Phase 9: Visual Infrastructure Maps and Version Tracking

Generate living system design views from discovered and imported infrastructure.

Primary outcomes:

- Resource dependency graph generation from provider metadata and imported-resource relationships.
- Visual maps for projects and environments.
- Manual annotations where provider metadata cannot prove a relationship.
- Version tracking for Nexus-owned context, provider-observed changes, template representations, and Git/deployment mappings where configured.

Completion criteria:

- Users can inspect how imported resources connect within a project or environment.
- Inferred relationships are distinguishable from explicit relationships.
- Version history explains meaningful changes without hiding uncertainty.

## Phase 10: Template Generation and Export Artifacts

Create templates from existing resources in maturity levels.

Primary outcomes:

- Documentation and inspection templates generated from existing resources.
- Parameterization based on project and environment details such as subscription ID, resource group, location, tags, naming inputs, and environment-specific values.
- Validated export artifacts for supported resource types.
- Fidelity criteria for deployment-ready templates.
- Clear labels for unsupported, partial, inferred, and validated output.

Completion criteria:

- Users can generate templates for understanding and review.
- Validated export artifacts have documented support boundaries.
- Nexus does not present output as deployment-ready until validation, approval, drift, rollback, and execution boundaries exist.

## Phase 11: Git and CI/CD Visibility

Connect infrastructure context to the repositories and pipelines that shape it.

Primary outcomes:

- Git repository, directory, file, pull request, and release mapping for imported resources.
- CI/CD pipeline and deployment event correlation.
- Read-only deployment history and audit views.
- Links between template versions, Git changes, provider activity, and imported resources.

Completion criteria:

- Teams can see where infrastructure is defined and which delivery workflows affect it.
- Nexus provides visibility and audit without triggering deployments.
- Git and CI/CD mappings preserve least-privilege access boundaries.

## Phase 12: Controlled Deployment Workflows

Explore controlled Azure change and provisioning workflows after the read-only MVP has proven the organization model.

Primary outcomes:

- Explicit design for what Nexus is allowed to change.
- Git-based deployment requests where appropriate.
- CI/CD trigger integrations where appropriate.
- Review and approval workflow for proposed changes.
- Policy checks before execution.
- Least-privilege enforcement for writable operations.
- Audit trail for proposed, approved, executed, failed, and rolled-back actions.

Completion criteria:

- Nexus can explain and constrain any Azure change before execution.
- Deployment actions use explicit approval and execution boundaries.
- Writable behavior is opt-in and does not weaken the read-only inspection workflows.

## Phase 13: Operational Resilience

Help operators run Nexus and understand resilience posture without making Nexus responsible for every connected workload.

Primary outcomes:

- Backup and restore workflows for Nexus data.
- Update and migration guidance.
- Health checks for Nexus services and provider integrations.
- Notifications for Nexus system health where configured.
- Error and log aggregation for Nexus application components.
- Disaster recovery planning guidance for Nexus deployments.

Completion criteria:

- Operators can back up, restore, update, and monitor the Nexus instance.
- Nexus documents its own disaster recovery posture.
- Connected-resource disaster recovery remains explicit integration or planning context unless later phases add controlled workflows.

## Phase 14: Terraform Representations

Add Terraform representations only where fidelity can be demonstrated.

Primary outcomes:

- Criteria for supported Terraform representation quality.
- Resource coverage list for Terraform output.
- Validation approach for generated or mapped Terraform.
- Clear labeling of unsupported or partial representations.

Completion criteria:

- Nexus does not present Terraform as deployment-ready unless fidelity has been validated.
- Users can distinguish reliable representations from exploratory or partial output.

## Phase 15: Additional Providers

Expand beyond Azure after the provider abstraction and resource-management workflow have proven useful.

Primary outcomes:

- Provider interface refined from real Azure implementation experience.
- Additional cloud provider discovery and import support.
- Provider-specific metadata views that still fit the Nexus project and environment model.

Completion criteria:

- Additional providers preserve the same mission: governed context without unnecessary control-plane takeover.
- Provider differences are visible where they matter and abstracted only where the abstraction is accurate.

## Phase 16: On-Premises Inventory and Management

Extend Nexus into hybrid infrastructure after the cloud-provider workflow and operational model are proven.

Primary outcomes:

- On-premises inventory and management model.
- Read-only operational context attached to projects, environments, and imported resources.
- Integration patterns for on-premises logs, metrics, backups, updates, health checks, and disaster recovery systems.

Completion criteria:

- Nexus improves infrastructure understanding without becoming a replacement monitoring or backup system by default.
- Hybrid and observability integrations retain self-hosting, least-privilege, and inspectability principles.

## Roadmap Guardrails

- Do not expand beyond the read-only Azure MVP plus lightweight health/status before the core organization workflow works end to end.
- Keep full observability, notifications, and operational resilience features post-MVP.
- Treat community outage signals as contextual unless the product explicitly supports notification escalation from those sources.
- Do not add writable infrastructure operations without explicit review, approval, least-privilege, and audit design.
- Start Git and CI/CD integration with visibility and audit before adding controlled orchestration.
- Separate template maturity levels: documentation and inspection, validated export artifacts, and deployment-ready templates.
- Do not promise deployment-ready Terraform until fidelity can be demonstrated.
- Do not add providers faster than Nexus can represent their resources accurately.
- Keep operator control over data, credentials, and deployment as a non-negotiable requirement.