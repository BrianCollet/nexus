# Pilot Acceptance Criteria: Auth + Workspace + RBAC

## Goal

Validate the first multi-user workspace flow with authentication, project/workspace management, workspace RBAC, and imported-resource context.

## Acceptance Criteria

1. A user can authenticate into a Nexus workspace with a valid identity and is rejected if credentials are invalid.
2. An administrator can create a workspace and invite at least one additional user.
3. A workspace member can be assigned Admin, Editor, or Viewer roles and only the allowed role actions succeed.
4. A project can be created with explicit environments, and only authorized users can modify those resources.
5. A discovered Azure resource can be reviewed and imported into the appropriate project and environment without modifying Azure state.
6. The imported resource view shows metadata, health/status context, and a read-only ARM representation.
7. A Viewer cannot perform organizational or import mutations.
8. A user with expired or invalid JWT credentials is denied API access and sees a secure challenge path.

## Critical Journeys

- `auth-sign-in`
- `workspace-admin-invite`
- `project-environment-rbac`
- `resource-import-flow`

## Notes

This pilot is intentionally deferred until after the application foundation has established the working local toolchain and QA workflow.
