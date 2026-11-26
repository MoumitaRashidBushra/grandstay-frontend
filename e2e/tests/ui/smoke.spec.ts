import { expect, test } from "../../fixtures/test";

// Read-only checks that are safe to run against any environment.
test.describe("frontend smoke", { tag: "@smoke" }, () => {
  test("home page loads", async ({ page, homePage }) => {
    await homePage.goto();
    await expect(page).toHaveTitle(/GrandStay/);
    await expect(homePage.heading).toBeVisible();
  });

  test("home page links to login", async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.loginLink.click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("login page renders the form", async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeEnabled();
  });

  test("login form validates input before submitting", async ({
    page,
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("not-an-email", "");
    await expect(page.getByText("Enter a valid email address")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("protected route redirects anonymous users to login", async ({
    page,
  }) => {
    await page.goto("/customer");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("unknown route shows the 404 page", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(
      page.getByRole("heading", { name: /page not found/i }),
    ).toBeVisible();
  });
});
