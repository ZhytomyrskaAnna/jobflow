# JobFlow

JobFlow is a full-stack job application management platform designed to help users organize vacancies, companies, applications, interviews, and application history in one place.

The project is built as a pnpm monorepo with a React frontend, NestJS backend, PostgreSQL database, and Prisma ORM.

## Features

Manage companies and vacancies.

Track job applications through different stages.

Record interviews and their results.

Keep application status history.

Track application activity and progress.

Separate frontend, backend, shared code, and documentation.

Use PostgreSQL as the primary database.

Use Docker for local infrastructure.

## Project Status

In development

## Tech Stack

# Frontend

- React
- TypeScript
- Vite
- React Router

# Backend

- NestJS
- TypeScript
- Prisma
- PostgreSQL driver adapter

# Database

- PostgreSQL
- Prisma ORM
- Tooling
- pnpm
- Docker / Docker Compose
- Git
- Oxlint
- Prettier
- Jest

## Repository Structure

- `apps/web` — frontend application
- `apps/api` — backend application
- `packages/shared` — shared code
- `docs` — project documentation

## Project Structure

jobflow/
├── apps/
│   ├── web/                 # React frontend
│   └── api/                 # NestJS backend
│
├── packages/
│   └── shared/              # Shared types and utilities
│
├── docs/
│   └── database/            # Database documentation
│
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── tsconfig.base.json
└── .env.example

## Database Documentation

Detailed database architecture is documented in:

docs/database/README.md

The documentation covers:

- database entities;
- relationships;
- application state;
- status history;
- ownership;
- indexes;
- migration workflow.

## Development Principles

JobFlow follows several architectural principles:

Keep infrastructure concerns separate from business logic.
Keep database access inside appropriate backend services/modules.
Keep HTTP logic outside React pages and components.
Use the database as the source of truth for persistent application state.
Keep application status history separate from the current application state.
Keep user ownership explicit on user-owned entities.
Prefer small, focused modules over large generic modules.
Document architectural decisions that affect future development.