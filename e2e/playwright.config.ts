import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

/**
 * GrandStay end-to-end tests. This project sits next to the apps:
 *
 *   Grandstay/
 *   ├── grandstay-backend/   NestJS API
 *   ├── grandstay-frontend/  React + Vite
 *   └── e2e/                 this project
 *
 * Choose the target with TEST_ENV (default "local"):
 *   local   -> tests localhost, can start the apps for you
 *   staging -> tests deployed URLs, starts nothing
 *
 * Settings come from .env.<TEST_ENV> (see .env.example).
 */
type TestEnv = "local" | "staging";

const testEnv = (process.env.TEST_ENV ?? "local") as TestEnv;
if (testEnv !== "local" && testEnv !== "staging") {
  throw new Error(`Unknown TEST_ENV "${testEnv}". Use "local" or "staging".`);
}

const envFile = resolve(import.meta.dirname, `.env.${testEnv}`);
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const isLocal = testEnv === "local";
const isCI = Boolean(process.env.CI);
const flag = (name: string, fallback: boolean) =>
  process.env[name] === undefined ? fallback : process.env[name] === "true";

const frontendURL =
  process.env.FRONTEND_URL ?? (isLocal ? "http://localhost:5173" : undefined);
const apiURL =
  process.env.API_URL ?? (isLocal ? "http://localhost:3000/api/v1" : undefined);

if (!frontendURL || !apiURL) {
  throw new Error(
    "FRONTEND_URL and API_URL must be set for staging (see .env.example).",
  );
}

// Share the resolved URLs with fixtures running in worker processes.
process.env.FRONTEND_URL = frontendURL;
process.env.API_URL = apiURL;

// e2e is inside the frontend repository.
const frontendDir = resolve(import.meta.dirname, "..");

const backendDir = resolve(
  import.meta.dirname,
  "..",
  "..",
  "grandstay-backend",
);

type WebServer = Extract<
  NonNullable<PlaywrightTestConfig["webServer"]>,
  readonly unknown[]
>[number];

const webServers: WebServer[] = [];

if (isLocal && flag("START_BACKEND", false)) {
  webServers.push({
    name: "backend",
    command: "npm run start:dev",
    cwd: backendDir,
    url: apiURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  });
}

if (isLocal && flag("START_FRONTEND", true)) {
  const port = new URL(frontendURL).port || "5173";
  webServers.push({
    name: "frontend",
    // On CI, test the production build: a cold Vite dev server re-optimizes
    // dependencies on first load and reloads the page mid-test.
    command: isCI
      ? `npm run build && npm run preview -- --port ${port} --strictPort`
      : `npm run dev -- --port ${port} --strictPort`,
    cwd: frontendDir,
    url: frontendURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  });
}

export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",

  fullyParallel: true,
  forbidOnly: isCI,
  // Staging runs over the network, so allow retries there and on CI.
  retries: isCI || !isLocal ? 2 : 0,
  workers: 1,
  timeout: isLocal ? 30_000 : 60_000,
  expect: { timeout: isLocal ? 5_000 : 10_000 },

  reporter: isCI
    ? [["github"], ["html", { open: "never" }], ["list"]]
    : [["html", { open: "never" }], ["list"]],

  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // Staging may sit behind a self-signed or internal certificate.
    ignoreHTTPSErrors: !isLocal,
  },

  webServer: webServers.length > 0 ? webServers : undefined,

  projects: [
    // Frontend UI tests in real browsers.
    {
      name: "chromium",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Chrome"], baseURL: frontendURL },
    },
    {
      name: "firefox",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Firefox"], baseURL: frontendURL },
    },
    {
      name: "webkit",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Safari"], baseURL: frontendURL },
    },
    {
      name: "mobile-chrome",
      testDir: "./tests/ui",
      use: { ...devices["Pixel 7"], baseURL: frontendURL },
    },
  ],
});
