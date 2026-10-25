#!/usr/bin/env node
'use strict';

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflowPath = '.github/workflows/d1-provision-deploy.yml';
const source = readFileSync(workflowPath, 'utf8');
const lines = source.split(/\r?\n/);
const pathsIndex = lines.findIndex((line) => /^    paths:\s*$/.test(line));
assert.notEqual(pathsIndex, -1, 'D1 workflow must declare a bounded push.paths filter');

const patterns = [];
for (let index = pathsIndex + 1; index < lines.length; index++) {
  const line = lines[index];
  if (/^\s{6}-\s+/.test(line)) {
    patterns.push(line.replace(/^\s{6}-\s+/, '').trim().replace(/^['"]|['"]$/g, ''));
    continue;
  }
  if (line.trim() === '') continue;
  break;
}
assert.deepEqual(patterns, [
  'backend/**',
  'database/**',
  'migrations/**',
  '.github/workflows/d1-provision-deploy.yml'
], 'D1 workflow path scope changed; review side effects before updating this contract');

function matches(file) {
  return patterns.some((pattern) => pattern.endsWith('/**')
    ? file.startsWith(pattern.slice(0, -2))
    : file === pattern);
}

const filesFromMergedPR171 = [
  '.github/workflows/live-runtime-smoke.yml',
  '.github/workflows/research-api-contract.yml',
  'docs/checkpoints/AQR-2026-10-26-AUTO02-RUN10-API-CONTRACT.md',
  'scripts/test-live-runtime-smoke.mjs',
  'scripts/test-research-api-contract.mjs'
];
for (const file of filesFromMergedPR171) {
  assert.equal(matches(file), false, `PR #171 file should not trigger D1 provisioning/deployment: ${file}`);
}
assert.equal(matches('backend/research-api.js'), true, 'backend changes should match the D1 workflow filter');
assert.equal(matches('.github/workflows/d1-provision-deploy.yml'), true, 'editing the D1 workflow should match its own filter');

const deployStart = lines.findIndex((line) => /^  deploy:\s*$/.test(line));
assert.notEqual(deployStart, -1, 'D1 workflow must contain the deploy job');
assert.match(lines.slice(deployStart + 1).join('\n'), /^    runs-on:\s*ubuntu-latest\s*$/m);
assert.doesNotMatch(lines.slice(deployStart + 1).join('\n'), /^    if:\s*/m,
  'D1 deploy job must not gain a silent job-level condition without explicit review');

console.log('PASS: D1 workflow retains one unconditional deploy job and bounded path filters.');
console.log('PASS: PR #171 changed paths do not match the D1 push filter; backend changes do.');
console.log('BOUNDARY: static source contract only; it cannot explain the historical zero-job run record.');
