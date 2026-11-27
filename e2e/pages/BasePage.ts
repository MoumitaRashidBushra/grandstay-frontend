import type { Page } from "@playwright/test";

/** Shared behaviour for every page object. */
export abstract class BasePage {
  protected abstract readonly path: string;

  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto(this.path);
  }
}
