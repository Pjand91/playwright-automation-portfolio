import { test, expect } from '@playwright/test';

test('user can add a product to the shopping cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Log in
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Add the first product to the cart
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Verify the cart contains one item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Open the shopping cart
  await page.locator('.shopping_cart_link').click();

  // Verify the selected product is displayed
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});