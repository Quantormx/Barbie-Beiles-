import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const URL = 'https://www.barbiebeiles.com/theguidemethod?frame_capture=20261031';
const OUT = path.resolve('artifacts/tgm-mobile-frames');
const viewport = { width: 393, height: 852 };

await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
});
const page = await context.newPage();
await page.goto(URL, { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForSelector('.hero-title', { timeout: 60000 });
await page.waitForTimeout(6000);
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
  document.documentElement.style.scrollBehavior = 'auto';
  const style = document.createElement('style');
  style.textContent = `*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}`;
  document.head.appendChild(style);
});
await page.waitForTimeout(2000);

const metrics = await page.evaluate(() => {
  const header = document.querySelector('.nav');
  const mobileAction = document.querySelector('.tgm-mobile-action');
  return {
    scrollHeight: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    headerHeight: header ? Math.ceil(header.getBoundingClientRect().height) : 0,
    mobileActionHeight: mobileAction ? Math.ceil(mobileAction.getBoundingClientRect().height) : 0,
    title: document.title,
  };
});

const step = 700;
const maxScroll = Math.max(0, metrics.scrollHeight - metrics.viewportHeight);
const positions = [];
for (let y = 0; y < maxScroll; y += step) positions.push(y);
positions.push(maxScroll);
const uniquePositions = [...new Set(positions.map(Math.round))];
const frames = [];

for (let i = 0; i < uniquePositions.length; i++) {
  const requestedY = uniquePositions[i];
  await page.evaluate((y) => window.scrollTo(0, y), requestedY);
  await page.waitForTimeout(220);
  const actualY = await page.evaluate(() => Math.round(window.scrollY));
  const section = await page.evaluate(() => {
    const x = window.innerWidth / 2;
    const y = Math.min(window.innerHeight - 100, Math.max(100, window.innerHeight * 0.52));
    const element = document.elementFromPoint(x, y);
    const section = element?.closest('section');
    const heading = section?.querySelector('h1,h2,h3,.eyebrow');
    return {
      className: section?.className || '',
      heading: heading?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 160) || '',
    };
  });
  const file = `frame-${String(i + 1).padStart(3, '0')}.png`;
  await page.screenshot({ path: path.join(OUT, file), fullPage: false, animations: 'disabled' });
  frames.push({ index: i + 1, file, requestedY, scrollY: actualY, sectionClass: section.className, heading: section.heading });
}

await fs.writeFile(path.join(OUT, 'manifest.json'), JSON.stringify({ URL, viewport, metrics, step, frames }, null, 2));
await browser.close();
console.log(`Captured ${frames.length} frames, page height ${metrics.scrollHeight}px.`);
