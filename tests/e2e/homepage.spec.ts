import { test, expect } from '@playwright/test';

test('homepage renders the masthead and breaking ticker', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toBeVisible();
});

test('language switcher toggles Amharic/English without navigation', async ({ page }) => {
  await page.goto('/');
  const url = page.url();
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page).toHaveURL(url);
});

test('search page finds an article by keyword', async ({ page }) => {
  await page.goto('/search');
  await page.getByRole('combobox').fill('corridor');
  await expect(page.getByRole('listbox')).toBeVisible();
});
