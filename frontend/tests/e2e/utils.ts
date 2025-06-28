import { Page } from '@playwright/test';

/**
 * Forces Math.random() to return a deterministic constant **inside the page context**.
 * Pass e.g. 0.05 to trigger the 'legacy down' branch.
 */
export async function stubRandom(page: Page, value: number) {
  await page.addInitScript((v) => {
    // executed in browser context
    Math.random = () => v;
  }, value);
}
