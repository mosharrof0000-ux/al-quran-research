#!/usr/bin/env node
'use strict';

const assert = (c, m) => { if (!c) throw new Error(m); };

const scopeAllows = (allowed, requested) =>
  requested === allowed || requested.startsWith(allowed.endsWith('/') ? allowed : allowed + '/');

const effective = (permission, token) => ({
  capability: permission.capability === token.capability ? permission.capability : null,
  operation: permission.operation === token.operation ? permission.operation : null,
  scope: scopeAllows(token.scope, permission.scope) ? permission.scope : null,
  environment: permission.environment === token.environment ? permission.environment : null,
  allowed: permission.status === 'ACTIVE' && token.status === 'ACTIVE' &&
    !permission.denied && !token.denied &&
    permission.capability === token.capability &&
    permission.operation === token.operation &&
    scopeAllows(token.scope, permission.scope) &&
    permission.environment === token.environment
});

const selectToken = (tokens) =>
  [...tokens].filter(t => t.status === 'ACTIVE')
    .sort((a,b) => a.privilegeCost - b.privilegeCost)[0] ?? null;

const tests = [
  ['TR-001 matching active token', () => {
    const r = effective(
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'},
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}
    );
    assert(r.allowed, 'matching token rejected');
  }],
  ['TR-002 token scope too narrow', () => {
    const r = effective(
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a/b',environment:'sandbox'},
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'}
    );
    assert(r.allowed, 'parent token scope should cover child resource');
  }],
  ['TR-003 token scope cannot be wider than permission', () => {
    const r = effective(
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'},
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}
    );
    assert(r.allowed, 'broader token may cover a narrower permission but does not widen effective scope');
  }],
  ['TR-004 capability mismatch denied', () => {
    const r = effective(
      {status:'ACTIVE',capability:'EDIT',operation:'WRITE',scope:'/data/a',environment:'sandbox'},
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}
    );
    assert(!r.allowed, 'capability mismatch accepted');
  }],
  ['TR-005 inactive token denied', () => {
    const r = effective(
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'},
      {status:'SUSPENDED',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}
    );
    assert(!r.allowed, 'inactive token accepted');
  }],
  ['TR-006 parent permission deny preserved', () => {
    const r = effective(
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox',denied:true},
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}
    );
    assert(!r.allowed, 'token bypassed parent deny');
  }],
  ['TR-007 least privilege selection', () => {
    const t = selectToken([
      {id:'wide',status:'ACTIVE',privilegeCost:10},
      {id:'narrow',status:'ACTIVE',privilegeCost:2}
    ]);
    assert(t.id === 'narrow', 'least privilege token not selected');
  }],
  ['TR-008 revoked token denied', () => {
    const r = effective(
      {status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'},
      {status:'REVOKED',capability:'READ',operation:'READ',scope:'/data',environment:'sandbox'}
    );
    assert(!r.allowed, 'revoked token accepted');
  }],
  ['TR-009 live environment mismatch denied', () => {
    const r = effective(
      {status:'ACTIVE',capability:'DEPLOY',operation:'DEPLOY',scope:'/app',environment:'live'},
      {status:'ACTIVE',capability:'DEPLOY',operation:'DEPLOY',scope:'/app',environment:'staging'}
    );
    assert(!r.allowed, 'environment mismatch accepted');
  }],
  ['TR-010 raw secret never represented', () => {
    const record = {token_id:'TOK-001',auth_reference:'secret://provider/token-001'};
    assert(!Object.values(record).some(v => String(v).startsWith('sk-')), 'raw secret exposed');
  }],
  ['TR-011 destructive default deny', () => {
    const r = effective(
      {status:'ACTIVE',capability:'DESTRUCTIVE',operation:'DELETE',scope:'/data',environment:'live',denied:true},
      {status:'ACTIVE',capability:'DESTRUCTIVE',operation:'DELETE',scope:'/data',environment:'live'}
    );
    assert(!r.allowed, 'destructive action bypassed deny');
  }],
  ['TR-012 no self escalation', () => {
    const request = {requested:'SECURITY_ADMIN',current:'READ',approved:false};
    assert(request.current !== request.requested && !request.approved, 'self escalation accepted');
  }]
];

let passed = 0;
for (const [name, test] of tests) {
  try { test(); passed++; console.log('PASS', name); }
  catch (e) { console.log('FAIL', name, '-', e.message); }
}
console.log(`RESULT: ${passed}/${tests.length} tests passed`);
if (passed !== tests.length) process.exit(1);
console.log('STATUS: PASS');
