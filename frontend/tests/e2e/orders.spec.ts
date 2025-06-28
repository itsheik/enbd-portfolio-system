import { test, expect } from '@playwright/test';
import { stubRandom } from './utils';

/* Selectors used repeatedly */
const selectors = {
  fund: 'label:has-text("Fund Name") select',
  type: 'label:has-text("Transaction Type") select',
  qty:  'label:has-text("Quantity") input',
  submit: 'role=button[name=/submit/i]',
  completedBadge: 'text=Completed',
  failedBadge: 'text=Failed',
};

test.describe('Order Entry – Module 3', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/orders');
  });

  /* 1 ▸ Validation errors block submission ------------------------------ */
  test('shows inline validation & blocks submit', async ({ page }) => {
    await page.click(selectors.submit);
    await expect(page.getByText('Invalid Security Name')).toBeVisible();
    await expect(page.getByText('Invalid Transaction Type')).toBeVisible();
    await expect(page.getByText('Invalid Quantity')).toBeVisible();
  });

  /* 2 ▸ Happy path – Completed status ----------------------------------- */
  test('books a BUY trade end-to-end', async ({ page }) => {
    await page.selectOption(selectors.fund, 'f1');     // Global Equity
    await page.selectOption(selectors.type, 'Buy');
    await page.fill(selectors.qty, '5');

    // Order Value should update live
    await expect(page.locator('input[readOnly]')).toHaveValue('$500');

    await page.click(selectors.submit);

    // Status trail should eventually show Completed
    await expect(page.locator(selectors.completedBadge)).toBeVisible({ timeout: 1500 });
  });

  /* 3 ▸ Forced legacy failure path -------------------------------------- */
  test('handles legacy outage gracefully', async ({ page, browserName }) => {
    await stubRandom(page, 0.05);             // 0.05 < 0.2 -> forces failure in mock

    await page.reload();                      // ensure stub applies
    await page.selectOption(selectors.fund, 'f1');
    await page.selectOption(selectors.type, 'Buy');
    await page.fill(selectors.qty, '1');
    await page.click(selectors.submit);

    await expect(page.locator(selectors.failedBadge)).toBeVisible({ timeout: 1500 });
    await expect(page.getByText(/legacy service unavailable/i)).toBeVisible();
  });
});
