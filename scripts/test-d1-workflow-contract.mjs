import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const path = new URL('../.github/workflows/d1-provision-deploy.yml', import.meta.url);
const workflow = readFileSync(path, 'utf8');
const lines = workflow.split(/\r?\n/);

// D1 provisioning has irreversible/production side effects: no automatic push deploy.
assert.match(workflow, /^on:\n  workflow_dispatch:\s*$/m, 'D1 workflow must be manual-dispatch only');
assert.doesNotMatch(workflow, /^  push:\s*$/m, 'D1 workflow must not auto-run on push');

const deployIndex = lines.findIndex((line) => line === '  deploy:');
assert.ok(deployIndex > 0 && lines[deployIndex - 1] === 'jobs:', 'D1 deploy job must be declared under jobs');
const jobLines = [];
for (let i = deployIndex + 1; i < lines.length; i += 1) {
  if (/^  [A-Za-z0-9_-]+:\s*$/.test(lines[i])) break;
  jobLines.push(lines[i]);
}
assert.ok(
  jobLines.some((line) => /^    if:\s*github\.event_name == 'workflow_dispatch' && vars\.ENABLE_D1_PROVISION_DEPLOY == 'true'\s*$/.test(line)),
  'deploy job must require manual dispatch and ENABLE_D1_PROVISION_DEPLOY=true'
);
assert.ok(jobLines.some((line) => /^    environment:\s*production\s*$/.test(line)), 'deploy job must use the production environment');
assert.ok(jobLines.some((line) => /^    runs-on:\s*ubuntu-latest\s*$/.test(line)), 'deploy job must declare a runner');
assert.ok(jobLines.some((line) => /^    steps:\s*$/.test(line)), 'deploy job must declare steps');
assert.ok(jobLines.some((line) => /^    timeout-minutes:\s*20\s*$/.test(line)), 'deploy job must keep a bounded timeout');

console.log('PASS: D1 deploy is manual-only, guarded by ENABLE_D1_PROVISION_DEPLOY=true, attached to production environment, and bounded by a 20-minute timeout.');
console.log("NOTE: repository administrators must configure the production environment's required reviewers and set the repository variable only when explicitly approved.");
console.log('NOTE: this source-contract test cannot explain historical zero-job runs; their metadata/source inconsistency remains a separate investigation.');
