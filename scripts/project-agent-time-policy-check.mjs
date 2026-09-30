#!/usr/bin/env node
/**
 * Al-Quran Research — Project Agent Time Policy Static Gate v1
 * Verifies the source-level contract for bounded active execution.
 * Read-only; no network, deployment, merge, or project mutation.
 */
import fs from 'node:fs';

const file = 'backend/project-agent/worker.js';
const source = fs.readFileSync(file, 'utf8');

const checks = {
  max_active_default_2h: source.includes('DEFAULT_ACTIVE_WINDOW_MS=2*60*60*1000'),
  same_failure_default_3: source.includes('DEFAULT_SAME_FAILURE_LIMIT=3'),
  env_active_limit: source.includes('AGENT_MAX_ACTIVE_MS'),
  env_failure_limit: source.includes('AGENT_MAX_SAME_FAILURES'),
  timeout_state: source.includes('WAITING_FOR_RECOVERY'),
  timeout_error: source.includes('ACTIVE_TIME_LIMIT_REACHED'),
  resumable_flag: source.includes('resumable:true'),
  agent_branch_only: source.includes("isAgentBranch(branch)") && source.includes("main-এ লেখা নিষিদ্ধ"),
  protected_paths: source.includes("'.github/'") && source.includes("'database/'") && source.includes("'migrations/'") && source.includes("'validation/'"),
  independent_verification: source.includes('independentVerify(env,identity,result.answer)')
};

const ok = Object.values(checks).every(Boolean);
console.log(JSON.stringify({ok,file,checks},null,2));
process.exit(ok ? 0 : 1);
