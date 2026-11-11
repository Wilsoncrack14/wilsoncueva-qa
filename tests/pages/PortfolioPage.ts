import { test as base, type Page, type Locator, expect } from '@playwright/test';

export class PortfolioPage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly navHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.locator('main h1').first();
    this.navHeader = page.locator('header');
  }

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async getHorizontalOverflowPx(): Promise<number> {
    return this.page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });
  }

  async verifyNoHorizontalOverflow(viewportWidth: number) {
    const overflow = await this.getHorizontalOverflowPx();
    expect(overflow, `Horizontal overflow detected at ${viewportWidth}px`).toBeLessThanOrEqual(0);
  }
}

export const test = base.extend<{ portfolioPage: PortfolioPage }>({
  portfolioPage: async ({ page }, use) => {
    const portfolioPage = new PortfolioPage(page);
    await use(portfolioPage);
  },
});

export { expect };
