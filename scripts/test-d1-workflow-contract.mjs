import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const path = new URL('../.github/workflows/d1-provision-deploy.yml', import.meta.url);
const workflow = readFileSync(path, 'utf8');
const lines = workflow.split(/\r?\n/);

const pushIndex = lines.findIndex((line) => line === '  push:');
const dispatchIndex = lines.findIndex((line) => line === '  workflow_dispatch:');
assert.ok(pushIndex >= 0, 'D1 workflow must declare a push trigger');
assert.ok(dispatchIndex > pushIndex, 'D1 workflow must declare workflow_dispatch after the push filter');

const pushBlock = lines.slice(pushIndex, dispatchIndex).join('\n');
assert.match(pushBlock, /^    branches:\n      - main$/m, 'push trigger must be limited to main');
for (const expectedPath of [
  'backend/**',
  'database/**',
  'migrations/**',
  '.github/workflows/d1-provision-deploy.yml'
]) {
  assert.ok(
    pushBlock.includes(`      - '${expectedPath}'`),
    `D1 workflow push path filter is missing ${expectedPath}`
  );
}

const deployIndex = lines.findIndex((line) => line === '  deploy:');
assert.ok(deployIndex > 0 && lines[deployIndex - 1] === 'jobs:', 'D1 deploy job must be declared under jobs');
const jobLines = [];
for (let i = deployIndex + 1; i < lines.length; i += 1) {
  if (/^  [A-Za-z0-9_-]+:\s*$/.test(lines[i])) break;
  jobLines.push(lines[i]);
}
assert.ok(jobLines.some((line) => /^    runs-on:\s*ubuntu-latest\s*$/.test(line)), 'deploy job must declare a runner');
assert.ok(jobLines.some((line) => /^    steps:\s*$/.test(line)), 'deploy job must declare steps');
assert.ok(jobLines.some((line) => /^    timeout-minutes:\s*20\s*$/.test(line)), 'deploy job must keep a bounded timeout');
assert.ok(
  !jobLines.some((line) => /^    if:\s*/.test(line)),
  'deploy job must not gain a job-level condition that silently skips all jobs'
);

console.log('PASS: D1 workflow declares main/path filters, manual dispatch, a deploy job, bounded timeout, and no job-level skip condition.');
console.log('NOTE: this source-contract test cannot explain a historical GitHub run with zero jobs; inspect GitHub Actions metadata for that.');
