import { chromium } from 'playwright';

const BASE = process.env.STUDIO_URL || 'http://127.0.0.1:5173';

const PACK_03_IDS = [
  'executive-scorecard-pro',
  'campaign-attribution-pro',
  'customer-journey-map-pro',
  'market-positioning-map-pro',
  'portfolio-risk-matrix-pro',
  'sales-territory-ranking-pro',
  'product-lifecycle-pro',
  'cohort-retention-pro',
  'scenario-comparison-pro',
  'strategic-roadmap-pro',
];

async function assertNoError(page, label = '') {
  const errorBar = page.locator('#error-bar');
  const hidden = await errorBar.evaluate((el) => el.hidden);
  if (!hidden) {
    const text = await errorBar.textContent();
    throw new Error(`Error bar visible${label ? ` for ${label}` : ''}: ${text}`);
  }
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1600, height: 900 } });
  const page = await context.newPage();
  const errors = [];

  try {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForSelector('#template-list .ep-ds-template-group', { timeout: 10000 });

    const itemCount = await page.locator('.ep-ds-template-item').count();
    if (itemCount !== 25) {
      errors.push(`Template count mismatch: expected 25, got ${itemCount}`);
    }

    const groupCount = await page.locator('.ep-ds-template-group').count();
    if (groupCount !== 4) {
      errors.push(`Category count mismatch: expected 4, got ${groupCount}`);
    }

    const firstGroup = page.locator('.ep-ds-template-group').first();
    await firstGroup.locator('.ep-ds-template-group-title').click();
    const hiddenAfterCollapse = await firstGroup.locator('.ep-ds-template-item').first().isHidden();
    if (!hiddenAfterCollapse) errors.push('Category collapse did not hide items');
    await firstGroup.locator('.ep-ds-template-group-title').click();
    const visibleAfterExpand = await firstGroup.locator('.ep-ds-template-item').first().isVisible();
    if (!visibleAfterExpand) errors.push('Category expand did not show items');

    await page.evaluate(() => {
      document.querySelectorAll('.ep-ds-template-group.collapsed').forEach((g) => g.classList.remove('collapsed'));
    });

    await page.locator('.ep-ds-template-item[data-id="funnel-story-pro"]').click();
    await page.waitForTimeout(600);
    await assertNoError(page, 'funnel-story-pro');

    for (const id of PACK_03_IDS) {
      const item = page.locator(`.ep-ds-template-item[data-id="${id}"]`);
      if ((await item.count()) === 0) {
        errors.push(`Template ${id} not found in list`);
        continue;
      }
      try {
        await item.scrollIntoViewIfNeeded();
        await item.click();
        await page.waitForTimeout(900);
        await assertNoError(page, id);
        const chart = page.locator('#chart-stage canvas');
        if ((await chart.count()) === 0) {
          errors.push(`No canvas rendered for ${id}`);
        }
      } catch (e) {
        errors.push(`${id}: ${e.message}`);
      }
    }

    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 10000 }),
      page.locator('button[data-export="png"]').first().click(),
    ]);
    const downloadPath = await download.path();
    if (!downloadPath) errors.push('PNG export download did not complete');
  } catch (e) {
    errors.push(`Unexpected failure: ${e.message}`);
  } finally {
    await browser.close();
  }

  const passed = errors.length === 0;
  console.log(JSON.stringify({ passed, errors }, null, 2));
  process.exit(passed ? 0 : 1);
})();
