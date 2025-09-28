import { test, expect } from '@playwright/test';

test.setTimeout(60000); // give the whole test up to 60s (increase if needed)

// --- Credentials (kept here for the test file) ---
const LOGIN_URL = 'https://app.apprabbit.com/login';
const EMAIL = 'sagephovid1@gmail.com';
const PASSWORD = 'cibzev-9hicGy-gytxit';

test('Admin dashboard login (multi-step)', async ({ page }) => {
  // 1) Go to login page
  await page.goto(LOGIN_URL, { waitUntil: 'load' });

  // 2) If there is a "Continue with Email" choice, click it.
  //    Use a few selector forms to be resilient to small wording/casing differences.
  const continueWithEmailButtons = [
    'button:has-text("Continue with Email")',
    'button:has-text("Continue with email")',
    'text=Continue with Email',
    'text=Continue with email'
  ];
  for (const sel of continueWithEmailButtons) {
    const btn = page.locator(sel);
    if (await btn.count() > 0 && await btn.isVisible()) {
      // click visible button and break out
      await btn.click();
      break;
    }
  }

  // 3) Wait for the email input to appear (the app transitions rather than full page reload)
  //    Try several common selectors used for email inputs.
  const emailSelectors = ['input[type="email"]', 'input[name="email"]', 'input[id*="email"]'];
  let emailFound = false;
  for (const sel of emailSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 8000, state: 'visible' });
      await page.locator(sel).fill(EMAIL);
      emailFound = true;
      break;
    } catch {
      // try next selector
    }
  }
  if (!emailFound) {
    throw new Error('Could not find email input. Inspect the login page and update the selector.');
  }

  // 4) Click the Continue button after entering email
  const continueButtons = [
    'button:has-text("Continue")',
    'button:has-text("continue")',
    'text=Continue'
  ];
  for (const sel of continueButtons) {
    const btn = page.locator(sel);
    if (await btn.count() > 0 && await btn.isVisible()) {
      await btn.click();
      break;
    }
  }

  // 5) Wait for password input to appear and fill it
  const passwordSelectors = ['input[type="password"]', 'input[name="password"]', 'input[id*="password"]'];
  let passwordFound = false;
  for (const sel of passwordSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 8000, state: 'visible' });
      await page.locator(sel).fill(PASSWORD);
      passwordFound = true;
      break;
    } catch {
      // try next
    }
  }
  if (!passwordFound) {
    throw new Error('Could not find password input. Inspect the login flow and update the selector.');
  }

  // 6) Click the login button (try several common label options)
  const loginButtons = [
    'button:has-text("Log in")',
    'button:has-text("Log In")',
    'button:has-text("Login")',
    'button:has-text("Sign in")',
    'button[type="submit"]'
  ];
  let clickedLogin = false;
  for (const sel of loginButtons) {
    const btn = page.locator(sel);
    if (await btn.count() > 0 && await btn.isVisible()) {
      await btn.click();
      clickedLogin = true;
      break;
    }
  }
  if (!clickedLogin) {
    throw new Error('Could not find a visible login/submit button to click.');
  }

  // 7) Confirm successful login:
  //    a) Wait until URL is NOT the login URL (redirect happened), OR
  //    b) Wait for a dashboard-specific element/text if available.
  // Try both in sequence with timeouts so the test is resilient.
  try {
    // Wait for the URL to change away from /login
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 20000 });
  } catch {
    // If URL didn't change, try to wait for some dashboard text or element.
    // We try a few possibilities; adjust/add more if you know a unique dashboard element.
    const dashboardLocators = [
      page.locator('text=Dashboard'),
      page.locator('text=Clients'),
      page.locator('nav'), // generic: navigation often appears on logged-in UI
      page.locator('#root') // fallback: root mounting may be populated/visible
    ];
    let ok = false;
    for (const loc of dashboardLocators) {
      try {
        await loc.waitFor({ state: 'visible', timeout: 10000 });
        ok = true;
        break;
      } catch {
        // try next
      }
    }
    if (!ok) {
      // provide helpful debugging info in the error
      throw new Error('Login may have failed or dashboard did not render in time. Check credentials or visual selectors.');
    }
  }

  // 8) Final assertion — ensure we are not on the login page and at least one dashboard indicator is visible
  await expect(page).not.toHaveURL(/\/login/);
  // optional: assert dashboard text if present
  const maybeDashboard = page.locator('text=Dashboard');
  if ((await maybeDashboard.count()) > 0) {
    await expect(maybeDashboard).toBeVisible({ timeout: 5000 });
  }

  console.log('✅ UI login test completed (login detected).');
});
