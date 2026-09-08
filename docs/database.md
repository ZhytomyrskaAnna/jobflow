### Current Status vs Status History

`Application.status` stores the current status of an application.

`ApplicationStatusHistory` stores the historical sequence of status changes.

The two fields have different purposes:

- `Application.status` is the source for the current state of an application.
- `ApplicationStatusHistory` is used to preserve the application's status-change history.
- Status history must not be used as a replacement for `Application.status`.
- A new `ApplicationStatusHistory` record is created whenever `Application.status` changes.

Example:

Application:
  status = TECHNICAL_INTERVIEW

ApplicationStatusHistory:
  SAVED
  APPLIED
  HR_INTERVIEW
  TECHNICAL_INTERVIEW

### Status Transition Invariant

Whenever an application's status changes:

1. `Application.status` must be updated to the new status.
2. A new `ApplicationStatusHistory` record must be created with the same status.
3. Both operations must represent the same status transition.

`ApplicationStatusHistory` must never become the source of truth for the current status.

### Transactional Status Change

Updating `Application.status` and creating the corresponding
`ApplicationStatusHistory` record must eventually be performed inside
the same database transaction.

This prevents inconsistent state where the current status changes
without a corresponding history record, or a history record is created
without updating the current status.

### Phase 1 Scope

Full status-changing endpoints are intentionally not implemented
during Phase 1.

The status transition invariant and transactional requirement are
documented now and will be implemented together with the application
business logic and API endpoints in a later phase.

## Data Ownership

JobFlow uses user-level data isolation.

Every private business record must ultimately belong to a specific User.

Ownership chains:

- Company → User
- Vacancy → Company → User
- Application → Vacancy → Company → User
- Interview → Application → User
- ApplicationStatusHistory → Application → User

`Vacancy` and `Application` also contain a direct `userId` reference.
These references support efficient user-scoped queries and explicit
ownership checks in the backend.