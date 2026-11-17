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
assert.match(workflow, /fetch-depth: 2/);
assert.match(workflow, /git diff --name-only HEAD\^ HEAD/);
assert.match(workflow, /grep -Fxq '\.github\/workflows\/d1-workflow-transition-guard\.yml'/);
assert.match(workflow, /grep -Fxq '\.github\/workflows\/d1-provision-deploy\.yml'/);
assert.match(workflow, /GH_TOKEN: \$\{\{ github\.token \}\}/);
console.log('PASS: D1 transition guard uses exact parent-to-commit changed paths before disabling or re-enabling the workflow');
