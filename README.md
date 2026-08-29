# Nexus

Nexus is a self-hostable, open-source infrastructure control plane for platform and cloud engineering teams. It provides a governed, unified view of infrastructure across public clouds and on-premises environments, beginning with Azure.

The first release helps teams discover their existing Azure estate, organize the resources that matter into projects and environments, and give the right people the right level of access. Nexus does not replace cloud providers; it provides the context and team workflow that provider consoles lack.

## The Problem

Infrastructure teams work across multiple provider consoles, subscriptions, resource groups, environments, and accounts. That fragmentation makes it difficult to answer basic operational questions:

- What infrastructure belongs to a product or team?
- Which environment is a resource part of?
- Who can view or manage its context?
- How does a discovered resource map to its infrastructure-as-code definition?

Nexus brings that context into one place while allowing teams to retain control of their cloud accounts, credentials, and deployment environment.

## Product Vision

Nexus will become a provider-agnostic control plane for managing and understanding infrastructure across public clouds and on-premises systems. It will make infrastructure easier to find, organize, inspect, and eventually operate through a consistent team-oriented experience.

The product is guided by these principles:

- **Projects provide context.** Resources are organized around the products, services, and teams that own them.
- **Environments are explicit.** Development, staging, production, and other operational boundaries are visible inside every project.
- **Access follows least privilege.** Teams can collaborate without granting broad provider-console access to everyone.
- **Self-hosting is fundamental.** Operators retain control of Nexus, its data, and its provider credentials.
- **Infrastructure should be inspectable.** Nexus makes resource metadata and supported code representations visible alongside the resource context.
- **Provider support grows incrementally.** Azure is first; multi-cloud and on-premises coverage are long-term goals.

## Initial MVP

The initial MVP is an Azure-first, read-only inventory and organization experience for platform and cloud engineering teams.

### User Workflow

1. A team administrator creates an account and team workspace in Nexus.
2. The administrator invites colleagues and assigns an **Admin**, **Editor**, or **Viewer** role.
3. An Admin or Editor creates a project and its environments, such as development, staging, and production.
4. An authorized user connects Azure through delegated user access or a service principal.
5. The team browses and discovers Azure resources available to that connection.
6. An Admin or Editor imports selected resources into the appropriate project and environment.
7. Team members inspect each imported resource's metadata and read-only Azure Resource Manager (ARM) template view.

Importing a resource into Nexus records its organizational context. It does not modify the resource in Azure.

### MVP Capabilities

- Authentication and a dashboard for the team workspace
- Team invitations and role-based access control with Admin, Editor, and Viewer roles
- Projects with explicit environments
- Azure connections using delegated credentials or service principals
- Azure resource browsing, discovery, and import
- Imported-resource metadata and a read-only ARM template code view

### Deliberately Out of Scope

The MVP will not:

- Create, modify, delete, or deploy Azure resources
- Generate or promise deployment-ready Terraform
- Support cloud providers other than Azure or on-premises integrations
- Provide monitoring, logging, metrics, or alerting dashboards
- Execute arbitrary infrastructure deployment code
- Define a custom permission builder beyond the initial Admin, Editor, and Viewer roles

## Conceptual Model

| Concept | Meaning |
| --- | --- |
| Team workspace | The shared Nexus space where users, access, projects, and provider connections are managed. |
| User | A person with access to a team workspace. |
| Role | The workspace access level: Admin, Editor, or Viewer. Detailed permissions will be defined during implementation. |
| Project | A logical grouping for the infrastructure supporting a product, service, or team. |
| Environment | An explicit operational boundary within a project, such as development, staging, or production. |
| Provider connection | Authorized access to a cloud provider; the MVP supports Azure connections. |
| Discovered resource | An Azure resource visible through a provider connection that has not yet been organized in Nexus. |
| Imported resource | A discovered resource associated with a Nexus project and environment without being changed in Azure. |

## Security and Deployment Expectations

Nexus is intended to be self-hosted. The deploying organization controls the instance, data, and provider credentials.

Azure access will use either delegated user credentials or service principals. Nexus must operate only within the permissions granted to the corresponding Azure identity and must not expand those permissions. The identity provider, secrets-storage mechanism, audit-retention policy, and detailed role permissions remain implementation decisions.

## Roadmap

The roadmap is directional and non-binding.

1. **MVP:** Azure discovery, import, organization by project and environment, team RBAC, and ARM inspection.
2. **Next:** Defensible Azure change and provisioning workflows, plus Terraform representations where their fidelity can be demonstrated.
3. **Later:** Additional cloud providers, on-premises inventory and management, and observability integrations for health, logs, and metrics.

## Project Status

Nexus is in its early product-definition stage. It is intended to be open source and self-hostable; the project license has not yet been selected.

Feedback from platform and cloud engineering teams is especially valuable as the project moves toward its first implementation.