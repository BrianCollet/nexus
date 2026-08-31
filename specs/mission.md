# Mission

Nexus is a self-hostable, open-source unified infrastructure control plane for managing resources across cloud providers and on-premises environments. Its mission is to give operators one governed place to discover, organize, inspect, understand, track, and eventually operate the infrastructure they already own.

Nexus begins with Azure as its first provider implementation. The long-term product direction is provider-agnostic coverage across public clouds and on-premises systems, with support growing incrementally and defensibly.

## Why Nexus Exists

Infrastructure teams work across provider consoles, subscriptions, resource groups, accounts, regions, environments, repositories, and on-premises systems. Each tool exposes a slice of the estate, but none provides a single operational surface for managing resources across all of it.

That fragmentation makes it difficult to answer basic infrastructure questions:

- What resources exist across providers and on-premises environments?
- Where are they running, and what account, subscription, resource group, region, project, or environment do they belong to?
- What product, service, or team owns this infrastructure?
- Who can view or manage the resource context?
- How does this discovered resource relate to infrastructure-as-code definitions?
- Is this resource healthy, degraded, down, recently changed, or affected by a provider issue?

Nexus exists to unify that fragmented resource picture. It should help operators understand their infrastructure estate, notice important state changes early, and move toward governed management workflows while retaining control of cloud accounts, credentials, deployment boundaries, and self-hosted data.

## Primary Users

Nexus is built for platform engineering, cloud engineering, infrastructure, and operations teams that manage resources across multiple providers, products, services, environments, or internal teams.

The first users are expected to be:

- Administrators who create the workspace, invite members, and manage access.
- Platform and cloud engineers who connect providers, discover resources, and organize infrastructure into projects and environments.
- Infrastructure and operations engineers who inspect resource metadata, status, relationships, and supported code representations.
- Service owners who need operational context without broad provider-console permissions.

## Main Mission

The main mission of Nexus is to become a unified infrastructure control plane for resources across cloud providers and on-premises environments.

Nexus should not replace Azure, Terraform, cloud consoles, observability platforms, backup systems, or deployment systems. Instead, it should sit beside them as a governed resource-management layer for provider connections, discovered resources, resource state, supported code representations, ownership, environment placement, and operational signals.

Projects, environments, ownership, and RBAC make this unified control plane usable for real organizations. They are important supporting capabilities, but the core value is unified infrastructure management across fragmented providers and environments.

For the first release, success means a team can connect Azure, discover resources it is already allowed to see, import selected resources into a Nexus project and environment, inspect their metadata and read-only Azure Resource Manager template representation, and see lightweight provider health or status context for those resources.

## Product Principles

- **Resources are unified first.** Nexus should provide one governed inventory and management surface across providers and on-premises environments.
- **Projects provide useful organization.** Resources should be organized around the products, services, systems, environments, and teams that help people operate them.
- **Environments are explicit.** Development, staging, production, and other operational boundaries should be visible inside every project.
- **Access follows least privilege.** Team members should collaborate without receiving unnecessary provider-console access.
- **Self-hosting is fundamental.** Operators should control the Nexus instance, data, provider credentials, and deployment environment.
- **Infrastructure should be inspectable.** Resource metadata and supported code representations should be visible alongside organizational context.
- **Operational state should be connected to resources.** Health, change, log, metric, notification, and deployment signals should be tied back to the resources, projects, and environments people already understand.
- **Provider support grows incrementally.** Azure is first; additional cloud and on-premises support should arrive only when it can meet the same quality bar.

## MVP Boundary

The MVP is an Azure-first, read-only inventory, organization, and lightweight status experience.

The MVP includes:

- Authentication and team workspace access.
- Invitations and role-based access control with Admin, Editor, and Viewer roles.
- Projects with explicit environments.
- Azure connections through delegated credentials or service principals.
- Azure resource browsing, discovery, and import.
- Imported-resource metadata and a read-only ARM template view.
- Lightweight Azure resource health or status context from provider APIs or explicit provider status feeds.

The MVP does not include:

- Creating, modifying, deleting, or deploying Azure resources.
- Deployment-ready Terraform generation.
- Cloud providers other than Azure.
- On-premises integrations.
- Full monitoring, log inspection, metrics dashboards, or alerting workflows.
- Custom notification delivery for modified, deleted, down, degraded, or otherwise changed resources.
- Deployment-ready template generation.
- Git-based deployment orchestration or CI/CD execution.
- Backup automation, update orchestration, error aggregation, or disaster recovery automation.
- Arbitrary infrastructure deployment code execution.
- A custom permission builder beyond Admin, Editor, and Viewer roles.

## Long-Term Direction

Nexus should grow from read-only inventory and organization into event-aware infrastructure management before it becomes an active deployment or operations control plane. Each expansion should preserve trust, inspectability, and least privilege.

After the MVP, Nexus may add customizable notifications, resource version tracking, log and metric inspection integrations, visual resource dependency maps, template generation from existing resources, Git and CI/CD visibility, defensible Azure change and provisioning workflows, deployment-ready templates where validation and approval boundaries exist, additional cloud providers, on-premises inventory and management, and operational resilience features for backups, updates, health checks, error aggregation, and disaster recovery planning.

Template generation should mature in stages: documentation and inspection first, validated export artifacts second, and deployment-ready templates only after validation, approval, and execution boundaries are designed. Deployment integration should follow the same pattern: visibility and audit first, controlled orchestration later.

Implementation choices should support this direction without compromising the first release. See [tech-stack.md](tech-stack.md) for core technical decisions and [roadmap.md](roadmap.md) for implementation sequencing.