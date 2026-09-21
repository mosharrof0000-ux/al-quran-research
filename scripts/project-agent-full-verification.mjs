#!/usr/bin/env node
/**
 * Al-Quran Research — Project Agent Full Verification Gate v1
 * Orchestrates the read-only browser, console, and network/API gates.
 *
 * Usage:
 *   node scripts/project-agent-full-verification.mjs [pageUrl]
 *
 * This gate never writes source files, merges, deploys, or changes production data.
 */
import { spawn } from 'node:child_process';

const pageUrl = process.argv[2] || 'https://mosharrof0000-ux.github.io/al-quran-research/#quran';
const scripts = [
  ['browser', 'scripts/project-agent-browser-check.mjs'],
  ['console', 'scripts/project-agent-console-check.mjs'],
  ['network_api', 'scripts/project-agent-network-api-check.mjs']
];

function run(name, file) {
  return new Promise(resolve => {
    const child = spawn(process.execPath, [file, pageUrl], {
      stdio:['ignore','pipe','pipe'],
      env:process.env
    });
    let stdout='', stderr='';
    child.stdout.on('data', d => stdout += d);
    child.stderr.on('data', d => stderr += d);
    child.on('close', code => {
      let parsed=null;
      try { parsed=JSON.parse(stdout); } catch {}
      resolve({name,file,exit_code:code,passed:code===0,result:parsed,stderr:stderr.trim()});
    });
    child.on('error', err => resolve({name,file,exit_code:null,passed:false,error:String(err?.message||err)}));
  });
}

const startedAt = new Date().toISOString();
const checks = [];
for (const [name,file] of scripts) checks.push(await run(name,file));

const result = {
  ok: checks.length === scripts.length && checks.every(x => x.passed),
  started_at: startedAt,
  completed_at: new Date().toISOString(),
  target: pageUrl,
  mode:'read-only',
  checks
};

console.log(JSON.stringify(result,null,2));
process.exit(result.ok ? 0 : 1);
