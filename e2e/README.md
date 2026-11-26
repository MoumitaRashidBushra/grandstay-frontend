# GrandStay E2E Tests

Playwright tests for the GrandStay frontend and backend. This is a separate
project; it does not change the app code.

```text
Grandstay/
├── grandstay-backend/    NestJS API
├── grandstay-frontend/   React + Vite
└── e2e/                  this project
    ├── fixtures/         custom `test` with page objects and test accounts
    ├── pages/            page objects (LoginPage, HomePage, ...)
    ├── tests/ui/         frontend tests in the browser
    └── playwright.config.ts
```

## First-time setup

```sh
cd e2e
npm install
npm run install:browsers
cp .env.example .env.local      # then edit it
```

## Run

| Command                    | What it runs                                |
| -------------------------- | ------------------------------------------- |
| `npm run test:local`       | Everything, all browsers, against localhost |
| `npm run test:local:ui`    | Frontend tests only, Chromium               |
| `npm run test:staging`     | `@smoke` tests against staging              |
| `npm run test:staging:all` | Every test against staging                  |
| `npm run test:headed`      | Frontend tests with the browser visible     |
| `npm run ui`               | Playwright UI mode                          |
| `npm run report`           | Open the last HTML report                   |

## Environments

`TEST_ENV` selects `.env.local` or `.env.staging`.

- **local**: starts the frontend from `../grandstay-frontend` automatically.
  Set `START_BACKEND=true` to also start `../grandstay-backend` (PostgreSQL
  must be running). Servers you already started are reused.
- **staging**: starts nothing. Set `FRONTEND_URL` and `API_URL`.

Tests that log in are skipped until `ADMIN_*` / `CUSTOMER_*` credentials are
set. Use dedicated test accounts on staging.
