
import { test, expect } from '@playwright/test';

const paymentDemo = `
<!DOCTYPE html>
<html>
  <body>
    <h1>Payment Withdrawal Demo</h1>
    <button id="withdraw">Request Withdrawal</button>
    <p id="status">No withdrawal requested</p>

    <script>
      document.querySelector('#withdraw').addEventListener('click', async () => {
        const response = await fetch('/api/withdrawal');
        const result = await response.json();

        const messages = {
          success: 'Withdrawal successful',
          failed: 'Withdrawal failed',
          pending: 'Withdrawal pending - awaiting confirmation'
        };

        document.querySelector('#status').textContent =
          messages[result.status] || 'Unknown withdrawal status';
      });
    </script>
  </body>
</html>
`;

async function openPaymentDemo(page: any, providerStatus: string) {
  await page.route('**/api/withdrawal', async (route: any) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: providerStatus })
    });
  });

  await page.route('**/', async (route: any) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: paymentDemo
    });
  });

  await page.goto('https://payment-demo.test/');
  await page.getByRole('button', { name: 'Request Withdrawal' }).click();
}

test('successful withdrawal displays success', async ({ page }) => {
  await openPaymentDemo(page, 'success');

  await expect(page.getByText('Withdrawal successful')).toBeVisible();
});

test('failed withdrawal displays failure', async ({ page }) => {
  await openPaymentDemo(page, 'failed');

  await expect(page.getByText('Withdrawal failed', { exact: true })).toBeVisible();
});

test('pending withdrawal is not incorrectly treated as failed', async ({ page }) => {
  await openPaymentDemo(page, 'pending');

  await expect(
    page.getByText('Withdrawal pending - awaiting confirmation')
  ).toBeVisible();

  await expect(
    page.getByText('Withdrawal failed', { exact: true })
  ).not.toBeVisible();
});
