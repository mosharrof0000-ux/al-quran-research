#!/usr/bin/env node
/**
 * Al-Quran Research — Project Agent Browser Automation v1
 * Read-only browser smoke/visual automation. Never edits the project.
 *
 * Usage:
 *   node scripts/project-agent-browser-check.mjs [url]
 * Requires Playwright in the execution environment.
 */
import { chromium } from 'playwright';

const url = process.argv[2] || 'https://mosharrof0000-ux.github.io/al-quran-research/#quran';
const timeout = Number(process.env.BROWSER_TIMEOUT_MS || 30000);
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
const consoleErrors = [];
const pageErrors = [];
const requestsFailed = [];

page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', err => pageErrors.push(String(err?.message || err)));
page.on('requestfailed', req => requestsFailed.push({url:req.url(),failure:req.failure()?.errorText||'unknown'}));

const result = {
  ok:false, url, checks:{navigation:false, document:false, interactive:false, screenshot:false},
  console_errors:consoleErrors, page_errors:pageErrors, failed_requests:requestsFailed
};

try {
  const response = await page.goto(url,{waitUntil:'networkidle',timeout});
  result.http_status = response?.status() ?? null;
  result.checks.navigation = Boolean(response && response.ok());

  await page.waitForLoadState('domcontentloaded');
  result.title = await page.title();
  result.checks.document = Boolean(await page.locator('body').count());

  const interactive = await page.locator('button,input,a,[role="button"]').count();
  result.interactive_elements = interactive;
  result.checks.interactive = interactive > 0;

  await page.screenshot({path:process.env.BROWSER_SCREENSHOT || 'project-agent-browser.png',fullPage:true});
  result.checks.screenshot = true;

  result.ok = Object.values(result.checks).every(Boolean) &&
    consoleErrors.length === 0 && pageErrors.length === 0;
} catch (error) {
  result.error = String(error?.message || error);
} finally {
  await browser.close();
}

console.log(JSON.stringify(result,null,2));
process.exit(result.ok ? 0 : 1);
