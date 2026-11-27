import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  protected readonly path = "/";

  readonly heading: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading", { level: 1 });
    this.loginLink = page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Login" });
  }
}
