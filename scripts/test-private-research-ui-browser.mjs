import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(process.cwd());
const coreFixture = await readFile(new URL('./fixtures/private-research-ui-core.js', import.meta.url), 'utf8');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json'
};
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    const relative = pathname === '/' ? '/index.html' : pathname;
    const file = resolve(root, '.' + relative);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403).end('forbidden');
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});

await new Promise((resolveListen) => server.listen(4173, '127.0.0.1', resolveListen));
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  const pageErrors = [];
  const failedRequests = [];
  let coreServed = false;
  page.on('pageerror', (error) => pageErrors.push(String(error?.message || error)));
  page.on('requestfailed', (request) => failedRequests.push(request.url() + ': ' + (request.failure()?.errorText || 'failed')));
  await page.route('**/al-quran-research@272a7d0d285d5942ca83ccd0a1751bc7a2921d7e/ui/home-v1/home-v1.js*', async (route) => {
    coreServed = true;
    await route.fulfill({ status: 200, contentType: 'text/javascript', body: coreFixture });
  });
  let installed = false;
  await page.route('**/private-research/sources', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        ok: true,
        version: '1.1',
        sources: [{
          source_id: 'SRC-IFB-001',
          name_bn: 'ইসলামিক ফাউন্ডেশন — আল-কুরআনুল করীম',
          status: 'PRIVATE',
          visibility: 'PRIVATE',
          locked_by_default: true,
          installed,
          permission_status: installed ? 'VERIFIED_TEST_FIXTURE' : 'PENDING_VERIFICATION'
        }]
      })
    });
  });
  await page.route('**/private-research/unlock', async (route) => {
    if (route.request().method() === 'OPTIONS') {
      await route.fulfill({
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        ok: true,
        source_id: 'SRC-IFB-001',
        access: 'GRANTED',
        access_token: 'synthetic-test-token',
        token_type: 'Bearer',
        expires_in_seconds: 900
      })
    });
  });

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
  const frame = page.frameLocator('#homeApp');
  await frame.locator('#plusBtn').waitFor({ timeout: 30000 });
  await frame.locator('#plusBtn').evaluate((el) => new Promise((resolveReady) => {
    const start = Date.now();
    const check = () => {
      if (typeof el.onclick === 'function') return resolveReady(true);
      if (Date.now() - start > 10000) return resolveReady(false);
      setTimeout(check, 50);
    };
    check();
  })).then((ready) => assert.equal(ready, true, 'pinned home core must initialize composer controls; coreServed=' + coreServed + '; pageErrors=' + JSON.stringify(pageErrors) + '; failedRequests=' + JSON.stringify(failedRequests)));

  // Uninstalled source: no PIN prompt and no unlock action.
  await frame.locator('#plusBtn').click();
  await frame.locator('#composerTools:not([hidden])').waitFor();
  await frame.locator('[data-tool="private-research"]').click();
  await frame.locator('#privateResearchDialog').waitFor({ state: 'visible' });
  const unavailableButton = frame.locator('#privateResearchSources button').first();
  await unavailableButton.waitFor();
  assert.equal(await unavailableButton.textContent(), 'ইনস্টল বাকি');
  assert.equal(await unavailableButton.isDisabled(), true);
  assert.equal(await frame.locator('#privateResearchUnlock').isHidden(), true);
  await frame.locator('#closePrivateResearch').click();

  // Installed synthetic fixture: a valid token may create a session, but UI must not claim Chat retrieval.
  installed = true;
  await frame.locator('#plusBtn').click();
  await frame.locator('#composerTools:not([hidden])').waitFor();
  await frame.locator('[data-tool="private-research"]').click();
  await frame.locator('#privateResearchDialog').waitFor({ state: 'visible' });
  await frame.locator('#privateResearchSources button').first().click();
  await frame.locator('#privateResearchPin').fill('synthetic-pin');
  await frame.locator('#privateResearchUnlockBtn').click();
  await frame.locator('#privateResearchStatus').filter({ hasText: 'Chat retrieval এখনো সংযুক্ত নয়' }).waitFor();
  assert.equal(await frame.locator('#privateResearchUnlock').isHidden(), true);
  const status = await frame.locator('#privateResearchStatus').textContent();
  assert.match(status, /Chat retrieval এখনো সংযুক্ত নয়/);
  assert.doesNotMatch(status, /Access granted|context সক্রিয়/);
  assert.deepEqual(pageErrors, [], 'browser page must not raise uncaught JavaScript errors');

  console.log('PASS: uninstalled source is disabled and cannot open a PIN prompt');
  console.log('PASS: valid synthetic session does not falsely claim Private Research Chat retrieval');
} finally {
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}
