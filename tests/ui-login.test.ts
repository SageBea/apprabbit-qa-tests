import { test, expect } from '@playwright/test';

// Replace these with your info (email/password)
const EMAIL = 'sagephovid1@gmail.com';
const PASSWORD = 'cibzev-9hicGy-gytxit';

test('Admin dashboard login', async ({ page }) => {
  // Go to login page
  await page.goto('https://app.apprabbit.com/login');

  // Step 1: Click "Continue with Email"
  await page.click('button:has-text("Continue with Email")');

  // Step 2: Fill in email and click continue
  await page.fill('input[type="email"]', EMAIL);
  await page.click('button:has-text("Continue")');

  // Step 3: Fill in password and click login
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button:has-text("Log in")');

  // Optional: wait for some element on dashboard to confirm successful login
  await expect(page.locator('text=Dashboard')).toBeVisible();
});
