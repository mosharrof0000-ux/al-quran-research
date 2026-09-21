#!/usr/bin/env node
/**
 * Al-Quran Research — Project Agent Runtime Static Regression Gate v1
 * Prevents undefined time-policy helper references and verifies critical runtime contracts.
 * Read-only.
 */
import fs from 'node:fs';

const file='backend/project-agent/worker.js';
const source=fs.readFileSync(file,'utf8');

const checks={
  no_undefined_maxActiveMs:!source.includes('maxActiveMs('),
  no_undefined_maxSameFailures:!source.includes('maxSameFailures('),
  activeWindowHelper:source.includes('function activeWindowMs(env)'),
  failureLimitHelper:source.includes('function sameFailureLimit(env)'),
  activeWindowUse:source.includes('activeWindowMs(env)'),
  failureLimitUse:source.includes('sameFailureLimit(env)'),
  timeoutRecovery:source.includes('WAITING_FOR_RECOVERY')&&source.includes('ACTIVE_TIME_LIMIT_REACHED'),
  independentVerification:source.includes('independentVerify(env,identity,result.answer)'),
  isolatedWriteGate:source.includes('isAgentBranch(branch)')&&source.includes('main-এ লেখা নিষিদ্ধ'),
  protectedPaths:source.includes("'.github/'")&&source.includes("'database/'")&&source.includes("'migrations/'")&&source.includes("'validation/'")
};

const ok=Object.values(checks).every(Boolean);
console.log(JSON.stringify({ok,file,checks},null,2));
process.exit(ok?0:1);
