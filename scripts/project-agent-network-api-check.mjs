#!/usr/bin/env node
/**
 * Al-Quran Research — Project Agent Network/API Test v1
 * Read-only network/API verification. Never edits the project.
 *
 * Usage:
 *   node scripts/project-agent-network-api-check.mjs [pageUrl]
 *
 * Optional:
 *   API_URL=https://... node scripts/project-agent-network-api-check.mjs
 */
import { chromium } from 'playwright';

const pageUrl = process.argv[2] || 'https://mosharrof0000-ux.github.io/al-quran-research/#quran';
const apiUrl = process.env.API_URL || 'https://al-quran-research-project-agent.workers.dev/';
const timeout = Number(process.env.BROWSER_TIMEOUT_MS || 30000);

const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});

const responses = [];
const failedRequests = [];
const consoleErrors = [];
const pageErrors = [];

page.on('response', response => {
  const status = response.status();
  responses.push({
    url: response.url(),
    status,
    ok: response.ok(),
    content_type: response.headers()['content-type'] || null
  });
});
page.on('requestfailed', request => {
  failedRequests.push({
    url: request.url(),
    failure: request.failure()?.errorText || 'unknown'
  });
});
page.on('console', msg => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', error => {
  pageErrors.push(String(error?.message || error));
});

const result = {
  ok:false,
  page_url:pageUrl,
  api_url:apiUrl,
  checks:{
    page_navigation:false,
    page_network:false,
    api_reachable:false,
    api_json:false,
    api_identity:false
  },
  page_responses:responses,
  failed_requests:failedRequests,
  console_errors:consoleErrors,
  page_errors:pageErrors
};

try {
  const pageResponse = await page.goto(pageUrl,{waitUntil:'networkidle',timeout});
  result.page_http_status = pageResponse?.status() ?? null;
  result.checks.page_navigation = Boolean(pageResponse && pageResponse.ok());

  result.checks.page_network =
    failedRequests.length === 0 &&
    responses.every(item => item.status < 400);

  const apiResponse = await page.request.get(apiUrl,{timeout});
  result.api_http_status = apiResponse.status();
  result.api_content_type = apiResponse.headers()['content-type'] || null;
  result.checks.api_reachable = apiResponse.ok();

  let apiBody = null;
  try {
    apiBody = await apiResponse.json();
    result.api_json = apiBody;
    result.checks.api_json = Boolean(apiBody && typeof apiBody === 'object');
    result.checks.api_identity =
      apiBody?.isolated === true &&
      apiBody?.merge === false &&
      apiBody?.deploy === false &&
      typeof apiBody?.version === 'string';
  } catch {
    result.api_json = null;
  }

  result.ok =
    Object.values(result.checks).every(Boolean) &&
    consoleErrors.length === 0 &&
    pageErrors.length === 0;
} catch (error) {
  result.error = String(error?.message || error);
}

await browser.close();
console.log(JSON.stringify(result,null,2));
process.exit(result.ok ? 0 : 1);
