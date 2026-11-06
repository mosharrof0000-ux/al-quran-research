import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const path = new URL('../.github/workflows/mosharrof-autonomous-development.yml', import.meta.url);
const workflow = readFileSync(path, 'utf8');

assert.match(
  workflow,
  /^\s*AGENT_URL:\s*\$\{\{\s*secrets\.MOSHARROF_AGENT_URL\s*\}\}\s*$/m,
  'AGENT_URL must map to the MOSHARROF_AGENT_URL Actions secret'
);
assert.match(
  workflow,
  /^\s*AGENT_ACCESS_TOKEN:\s*\$\{\{\s*secrets\.AGENT_ACCESS_TOKEN\s*\}\}\s*$/m,
  'AGENT_ACCESS_TOKEN must map to the authorized AGENT_ACCESS_TOKEN Actions secret'
);
assert.match(workflow, /^\s*timeout-minutes:\s*45\s*$/m, 'agent job must keep its bounded timeout');

const start = workflow.indexOf('- name: Start isolated Mosharrof agent cycle');
const next = workflow.indexOf('- name: Read agent decision', start);
assert.ok(start >= 0 && next > start, 'agent request step must be present and bounded by the next step');
const agentStep = workflow.slice(start, next);
const urlGuard = agentStep.indexOf('test -n "$AGENT_URL"');
const tokenGuard = agentStep.indexOf('test -n "$AGENT_ACCESS_TOKEN"');
const request = agentStep.indexOf('urllib.request.Request(');
assert.ok(urlGuard >= 0, 'agent URL must be validated before the request');
assert.ok(tokenGuard >= 0, 'agent token must be validated before the request');
assert.ok(request > urlGuard && request > tokenGuard, 'both non-empty guards must precede the HTTP request');
assert.match(agentStep, /headers=\{"Authorization":"Bearer "\+os\.environ\["AGENT_ACCESS_TOKEN"\]/, 'agent token must be sent as an Authorization bearer header');
assert.doesNotMatch(agentStep, /(?:echo|print)\s+[^\n]*(?:AGENT_ACCESS_TOKEN|Authorization)/i, 'agent token must not be printed to logs');

console.log('PASS: autonomous-agent workflow maps the expected secrets, checks both values before HTTP, keeps a bounded timeout, and does not print credentials.');
console.log('NOTE: this validates workflow wiring only; it cannot verify that repository secrets are configured.');
