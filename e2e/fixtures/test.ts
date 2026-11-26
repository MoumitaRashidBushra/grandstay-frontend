/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

export interface Account {
  email: string;
  password: string;
}

/** Reads a test account from env vars; undefined when not configured. */
function account(
  prefix: "ADMIN" | "RECEPTIONIST" | "CUSTOMER",
): Account | undefined {
  const email = process.env[`${prefix}_EMAIL`];
  const password = process.env[`${prefix}_PASSWORD`];

  return email && password ? { email, password } : undefined;
}

interface Fixtures {
  homePage: HomePage;
  loginPage: LoginPage;
}

interface WorkerFixtures {
  accounts: {
    admin?: Account;
    receptionist?: Account;
    customer?: Account;
  };
}

/** Use this `test` instead of the one from @playwright/test. */
export const test = base.extend<Fixtures, WorkerFixtures>({
  // Playwright's use() is a fixture callback, not a React Hook.

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  accounts: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      await use({
        admin: account("ADMIN"),
        receptionist: account("RECEPTIONIST"),
        customer: account("CUSTOMER"),
      });
    },
    { scope: "worker" },
  ],
});

export { expect } from "@playwright/test";
