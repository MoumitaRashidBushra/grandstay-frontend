import { expect, test } from "../../fixtures/test";

// Needs the backend running and the test accounts set in .env.<TEST_ENV>.
test.describe("login flow", { tag: "@auth" }, () => {
  test(
    "admin is sent to the admin dashboard",
    { tag: "@smoke" },
    async ({ page, loginPage, accounts }) => {
      test.skip(!accounts.admin, "Set ADMIN_EMAIL and ADMIN_PASSWORD.");

      // page.on("response", async (response) => {
      //   if (response.url().includes("/auth/login")) {
      //     console.log("ADMIN LOGIN STATUS:", response.status());
      //     console.log("ADMIN LOGIN URL:", response.url());

      //     try {
      //       console.log("ADMIN LOGIN RESPONSE:", await response.text());
      //     } catch {
      //       console.log("Could not read response body.");
      //     }
      //   }
      // });

      // page.on("requestfailed", (request) => {
      //   console.log("FAILED REQUEST:", request.url());
      //   console.log("FAILURE:", request.failure()?.errorText);
      // });

      await loginPage.goto();
      await loginPage.login(accounts.admin!.email, accounts.admin!.password);

      await expect(page).toHaveURL(/\/admin$/);
    },
  );

  test(
    "customer is sent to the customer dashboard",
    { tag: "@smoke" },
    async ({ page, loginPage, accounts }) => {
      test.skip(
        !accounts.customer,
        "Set CUSTOMER_EMAIL and CUSTOMER_PASSWORD.",
      );
      await loginPage.goto();
      await loginPage.login(
        accounts.customer!.email,
        accounts.customer!.password,
      );
      await expect(page).toHaveURL(/\/customer$/);
    },
  );

  test("wrong password shows an error", async ({ loginPage, accounts }) => {
    const user = accounts.admin ?? accounts.customer;
    test.skip(!user, "Set ADMIN_* or CUSTOMER_* credentials.");
    await loginPage.goto();
    await loginPage.login(user!.email, `${user!.password}-wrong`);
    await expect(loginPage.errorAlert).toContainText(
      "Invalid email or password",
    );
  });

  test(
    "receptionist is sent to the staff console",
    { tag: "@smoke" },
    async ({ page, loginPage, accounts }) => {
      test.skip(
        !accounts.receptionist,
        "Set RECEPTIONIST_EMAIL and RECEPTIONIST_PASSWORD.",
      );

      await loginPage.goto();

      await loginPage.login(
        accounts.receptionist!.email,
        accounts.receptionist!.password,
      );

      await expect(page).toHaveURL(/\/staff\/?$/);

      // Verify that the staff console is displayed.
      await expect(
        page.getByRole("heading", { name: "GrandStay Staff" }),
      ).toBeVisible();

      await expect(
        page.getByText("Staff Operations", { exact: true }),
      ).toBeVisible();

      // Customer booking navigation should not be offered.
      await expect(
        page.getByRole("link", { name: /browse rooms/i }),
      ).toHaveCount(0);
    },
  );
});
