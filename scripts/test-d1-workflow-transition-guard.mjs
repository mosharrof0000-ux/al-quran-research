import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const path = new URL('../.github/workflows/d1-workflow-transition-guard.yml', import.meta.url);
const workflow = readFileSync(path, 'utf8');

assert.match(workflow, /^on:\n  push:\n    branches:\n      - main/m);
assert.match(workflow, /\.github\/workflows\/d1-workflow-transition-guard\.yml/);
assert.match(workflow, /\.github\/workflows\/d1-provision-deploy\.yml/);
assert.match(workflow, /^  actions: write$/m);
assert.match(workflow, /actions\/workflows\/365243636\/disable/);
assert.match(workflow, /actions\/workflows\/365243636\/enable/);
assert.match(workflow, /contains\(toJSON\(github\.event\.commits\), '\.github\/workflows\/d1-workflow-transition-guard\.yml'\)/);
assert.match(workflow, /contains\(toJSON\(github\.event\.commits\), '\.github\/workflows\/d1-provision-deploy\.yml'\)/);
assert.match(workflow, /GH_TOKEN: \$\{\{ github\.token \}\}/);
console.log('PASS: D1 workflow transition guard detects push paths, disables legacy auto-deploy, and re-enables the manual-only replacement');
