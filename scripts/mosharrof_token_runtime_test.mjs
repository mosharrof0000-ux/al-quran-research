#!/usr/bin/env node
'use strict';
const assert=(c,m)=>{if(!c)throw new Error(m)};
const {resolveToken,isUnder}=await import('./mosharrof_token_engine.mjs');

const tests = [
  ['TR-001 active matching token', () => {
    const r=resolveToken({permission:{capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'},tokens:[{token_id:'T1',status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox',privilegeCost:2}]});
    assert(r.status==='AUTHORIZED' && r.effective_scope==='/data/a','matching token rejected');
  }],
  ['TR-002 narrow token denied for child scope', () => {
    const r=resolveToken({permission:{capability:'READ',operation:'READ',scope:'/data/b',environment:'sandbox'},tokens:[{token_id:'T1',status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox',privilegeCost:2}]});
    assert(r.status==='BLOCKED','narrow token widened');
  }],
  ['TR-003 broad token cannot widen effective scope', () => {
    const r=resolveToken({permission:{capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'},tokens:[{token_id:'T1',status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox',privilegeCost:2}]});
    assert(r.status==='AUTHORIZED' && r.effective_scope==='/data/a','effective scope widened');
  }],
  ['TR-004 capability mismatch denied', () => {
    const r=resolveToken({permission:{capability:'EDIT',operation:'WRITE',scope:'/data/a',environment:'sandbox'},tokens:[{token_id:'T1',status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}]});
    assert(r.status==='BLOCKED','capability mismatch accepted');
  }],
  ['TR-005 inactive token denied', () => {
    const r=resolveToken({permission:{capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'},tokens:[{token_id:'T1',status:'SUSPENDED',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}]});
    assert(r.status==='BLOCKED','inactive token accepted');
  }],
  ['TR-006 parent deny preserved', () => {
    const r=resolveToken({permission:{denied:true,capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'},tokens:[{token_id:'T1',status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}]});
    assert(r.status==='DENIED','parent deny bypassed');
  }],
  ['TR-007 least privilege selected', () => {
    const r=resolveToken({permission:{capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'},tokens:[
      {token_id:'WIDE',status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox',privilegeCost:10},
      {token_id:'NARROW',status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox',privilegeCost:2}]});
    assert(r.token_id==='NARROW','least privilege token not selected');
  }],
  ['TR-008 revoked token denied', () => {
    const r=resolveToken({permission:{capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'},tokens:[{token_id:'T1',status:'REVOKED',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}]});
    assert(r.status==='BLOCKED','revoked token accepted');
  }],
  ['TR-009 environment mismatch denied', () => {
    const r=resolveToken({permission:{capability:'DEPLOY',operation:'DEPLOY',scope:'/app',environment:'live'},tokens:[{token_id:'T1',status:'ACTIVE',capability:'DEPLOY',operation:'DEPLOY',scope:'/app',environment:'staging'}]});
    assert(r.status==='BLOCKED','environment mismatch accepted');
  }],
  ['TR-010 raw secret not part of registry record', () => {
    const record={token_id:'T1',auth_reference:'secret://cloudflare/mosharrof/T1'};
    assert(!Object.values(record).some(v=>/^(sk-|cfp_|secret=)/i.test(String(v))),'raw secret represented');
  }],
  ['TR-011 destructive default deny', () => {
    const r=resolveToken({permission:{destructive:true,capability:'DESTRUCTIVE',operation:'DELETE',scope:'/data',environment:'live'},tokens:[{token_id:'T1',status:'ACTIVE',capability:'DESTRUCTIVE',operation:'DELETE',scope:'/data',environment:'live'}]});
    assert(r.status==='DENIED','destructive operation bypassed approval');
  }],
  ['TR-012 self escalation blocked by capability mismatch/no approval', () => {
    const r=resolveToken({permission:{security_admin:true,capability:'SECURITY_ADMIN',operation:'ADMIN',scope:'/account',environment:'live'},tokens:[{token_id:'T1',status:'ACTIVE',capability:'READ',operation:'READ',scope:'/account',environment:'live'}]});
    assert(r.status==='REQUIRES_APPROVAL','security escalation did not require approval');
  }],
  ['TR-013 boundary helper', () => {
    assert(isUnder('/data','/data/a') && !isUnder('/data/a','/data'),'scope boundary incorrect');
  }]
];
let passed=0;
for(const [name,fn] of tests){try{fn();passed++;console.log('PASS',name)}catch(e){console.log('FAIL',name,'-',e.message)}}
console.log(`RESULT: ${passed}/${tests.length} tests passed`);
if(passed!==tests.length)process.exit(1);
console.log('STATUS: PASS');
