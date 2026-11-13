# GrandStay Frontend

This is the React + TypeScript frontend for the GrandStay hotel booking and reservation system. It uses Vite for development and builds, and React Router for the main customer and staff areas.

## Prerequisites

Before you start, make sure you have:

- Node.js 20.19 or newer, or 22.12 or newer
- npm 9 or newer
- A terminal such as PowerShell, Git Bash, or VS Code terminal

## Setup

From the repository root:

```sh
npm install
```

## Run the app locally

```sh
npm run dev
```

Then open the local URL shown in the terminal, typically:

```text
http://localhost:5173
```

If you want Vite to accept requests from another device or network host, run:

```sh
npm run dev -- --host
```

## Available scripts

| Command                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the Vite development server                |
| `npm run build`        | Type-check and create a production build         |
| `npm run preview`      | Preview the production build locally             |
| `npm run lint`         | Run oxlint across the project                   |
| `npm run lint:fix`     | Apply automatic oxlint fixes                   |
| `npm run test`         | Run the Vitest suite in CI mode                 |
| `npm run test:watch`   | Run Vitest in watch mode                        |
| `npm run format`       | Format project files with Prettier              |
| `npm run format:check` | Check formatting without changing files         |

## Application routes

| Path               | Area            |
| ------------------ | --------------- |
| `/`                | Home page       |
| `/customer/*`      | Customer portal |
| `/staff/*`         | Staff console   |
| Any unmatched path | Not found page  |

## Project structure

```text
grandstay-frontend/
├── public/
├── src/
│   ├── pages/
│   ├── routes/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Validation in CI

The project is configured for GitHub Actions to validate the frontend with:

```sh
npm run lint
npm test
```

This is the current CI check used for pull requests.

## Notes

- This frontend is intended to be used with the backend project in the same workspace when API features are connected.
- The project uses Vite, React 18, TypeScript, React Router, TanStack Query, React Hook Form, Zod, and date-fns.
- There are no custom environment variables required for the default starter setup, but you can add a `.env.local` file later if the app needs API configuration.
