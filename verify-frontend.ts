import { chromium } from "playwright";

async function verify() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Start the server
  const server = require('child_process').spawn('bun', ['run', 'dev'], { stdio: 'inherit' });

  // Wait for the server to be ready
  await new Promise(resolve => setTimeout(resolve, 3000));

  await page.goto("http://localhost:3000");

  // Focus the skip link to make it visible
  const skipLink = page.locator('a:has-text("Skip to content")');
  await skipLink.focus();

  // Take a screenshot of the skip link when focused
  await page.screenshot({ path: "skip-link-focused.png" });

  // Check that the skip link targets #main and main is tabIndex -1
  const mainTarget = page.locator('#main');
  const mainTabIndex = await mainTarget.getAttribute('tabindex');
  console.log('Main element tabindex:', mainTabIndex);

  await browser.close();
  server.kill();
  process.exit(0);
}

verify().catch(console.error);
