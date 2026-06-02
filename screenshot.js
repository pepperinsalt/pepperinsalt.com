const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_desktop.png', fullPage: true });

  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: 'screenshot_mobile.png', fullPage: true });

  await browser.close();
})();
