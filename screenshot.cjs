const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const base = 'C:/Users/adham/.gemini/antigravity/brain/fe7b2977-9cea-42d4-927b-2506046733a5';
  const pages = [['/', 'home_black'], ['/leadership', 'leadership_black'], ['/events', 'events_black'], ['/about', 'about_black']];
  for (const [p, n] of pages) {
    const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await pg.goto('http://localhost:3000' + p, { waitUntil: 'networkidle' });
    await pg.screenshot({ path: base + '/' + n + '.png', fullPage: false });
    await pg.close();
    console.log('done', n);
  }
  await browser.close();
})();
