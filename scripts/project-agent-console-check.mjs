#!/usr/bin/env node
/**
 * Al-Quran Research — Project Agent Console Error Test v1
 * Read-only console/network gate. Never edits the project.
 *
 * Usage:
 *   node scripts/project-agent-console-check.mjs [url]
 * Requires Playwright in the execution environment.
 */
import { chromium } from 'playwright';

const url = process.argv[2] || 'https://mosharrof0000-ux.github.io/al-quran-research/#quran';
const timeout = Number(process.env.BROWSER_TIMEOUT_MS || 30000);
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});

const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];

page.on('console', msg => {
  if (msg.type() === 'error') consoleErrors.push({type:'console', message:msg.text()});
});
page.on('pageerror', err => {
  pageErrors.push({type:'pageerror', message:String(err?.message || err)});
});
page.on('requestfailed', req => {
  failedRequests.push({
    type:'requestfailed',
    url:req.url(),
    failure:req.failure()?.errorText || 'unknown'
  });
});

const result = {
  ok:false,
  url,
  checks:{navigation:false,console:false,page_errors:false,network:false},
  console_errors:consoleErrors,
  page_errors:pageErrors,
  failed_requests:failedRequests
};

try {
  const response = await page.goto(url,{waitUntil:'networkidle',timeout});
  result.http_status = response?.status() ?? null;
  result.checks.navigation = Boolean(response && response.ok());
  await page.waitForLoadState('domcontentloaded');

  result.checks.console = consoleErrors.length === 0;
  result.checks.page_errors = pageErrors.length === 0;
  result.checks.network = failedRequests.length === 0;
  result.ok = Object.values(result.checks).every(Boolean);
} catch (error) {
  result.error = String(error?.message || error);
}

await browser.close();
console.log(JSON.stringify(result,null,2));
process.exit(result.ok ? 0 : 1);
