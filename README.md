# GrandStay Frontend

[![Frontend CI](https://github.com/MoumitaRashidBushra/grandstay-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/MoumitaRashidBushra/grandstay-frontend/actions/workflows/ci.yml)

The frontend application for the **GrandStay Hotel Booking & Reservation Management System**. It is built with React 18, TypeScript, and Vite, with separate interfaces for customers, receptionists, and administrators.

## Prerequisites

Before getting started, make sure you have:

- Node.js 20.19+ or 22.12+
- npm 9+
- Git
- A terminal such as PowerShell, Git Bash, or the VS Code terminal

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MoumitaRashidBushra/grandstay-frontend.git
cd grandstay-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

The API base URL should point to the running GrandStay backend.

An example configuration is available in `.env.example`.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal, typically:

```text
http://localhost:5173
```

To allow access from another device on your local network:

```bash
npm run dev -- --host
```

## Available Scripts

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the Vite development server                   |
| `npm run build`        | Run TypeScript checks and create a production build |
| `npm run preview`      | Preview the production build locally                |
| `npm run lint`         | Run ESLint                                          |
| `npm run lint:fix`     | Automatically fix supported ESLint issues           |
| `npm run test`         | Run Vitest tests with coverage                      |
| `npm run test:watch`   | Run Vitest in watch mode                            |
| `npm run format`       | Format project files with Prettier                  |
| `npm run format:check` | Check formatting without modifying files            |

## Application Routes

| Route            | Description            | Access              |
| ---------------- | ---------------------- | ------------------- |
| `/`              | Home page              | Public              |
| `/login`         | Login page             | Public              |
| `/rooms`         | Browse available rooms | Public              |
| `/no-access`     | Access denied page     | Public              |
| `/customer/*`    | Customer portal        | CUSTOMER            |
| `/staff/*`       | Staff console          | ADMIN, RECEPTIONIST |
| `/admin/*`       | Administration pages   | ADMIN               |
| Unmatched routes | Not found page         | Public              |

The application uses role-based route protection to restrict access to authenticated users according to their assigned roles.

## Project Structure

```text
grandstay-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   │   ├── admin/
│   │   ├── customer/
│   │   └── staff/
│   ├── routes/
│   ├── services/
│   ├── test/
│   ├── types/
│   └── utils/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Routing:** React Router
- **Styling:** Tailwind CSS 4
- **Server state:** TanStack Query
- **Forms and validation:** React Hook Form, Zod
- **HTTP client:** Axios
- **Date utilities:** date-fns
- **Icons:** Lucide React
- **Testing:** Vitest, React Testing Library, jsdom
- **Code quality:** ESLint, Prettier

## Backend Integration

The frontend communicates with the GrandStay backend through the configured API base URL.

Make sure the backend is running and that `VITE_API_BASE_URL` points to its API endpoint before testing API-dependent features.

## Validation in CI

GitHub Actions runs the following checks on pull requests targeting `main` or `master`:

```bash
npm ci
npm run format:check
npm run lint
npm run build
npm test
```

The Vitest coverage gate currently requires:

- 15% statement coverage
- 5% branch coverage
- 7% function coverage
- 15% line coverage

These are baseline thresholds and should increase as additional feature tests are introduced.

## Development Notes

- Follow the project's branch and pull request workflow when contributing.
- Keep customer, staff, and admin functionality separated according to their access permissions.
- Do not commit `.env.local` or other files containing local secrets.
- Keep `.env.example` updated whenever required environment variables change.
