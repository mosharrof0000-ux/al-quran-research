#!/usr/bin/env node
/**
 * Project Agent — Task History & Recovery Lineage static gate.
 * Read-only.
 */
import fs from 'node:fs';

const source=fs.readFileSync('backend/project-agent/worker.js','utf8');
const required=[
  'async function persistTask',
  'async function loadTask',
  'history=Array.isArray(current?.history)',
  'history.push(event)',
  'task_id:task.task_id',
  'agent_id:task.agent_id',
  'session_id:task.session_id',
  'branch:task.branch',
  'parent_task_id',
  'resume_count',
  'last_verified_step',
  'last_commit',
  'recovery_point',
  'previous_state',
  'WAITING_FOR_RECOVERY',
  'HANDOFF_COMPLETE',
  "agent/*"
];
const checks=Object.fromEntries(required.map(x=>[x,source.includes(x)]));
const ok=Object.values(checks).every(Boolean)&&!source.includes("writeFile(env,{path:'main/");
console.log(JSON.stringify({ok,checks},null,2));
process.exit(ok?0:1);
