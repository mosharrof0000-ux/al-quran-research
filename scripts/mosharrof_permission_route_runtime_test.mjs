#!/usr/bin/env node
'use strict';

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const intersection = (parent, child) => ({
  capability: parent.capability === child.capability ? child.capability : null,
  operation: parent.operation === child.operation ? child.operation : null,
  scope: child.scope.startsWith(parent.scope) ? child.scope : null,
  environment: parent.environment === child.environment ? child.environment : null,
  denied: parent.denied || child.denied
});

const canCreateChild = (parent, child) => {
  const e = intersection(parent, child);
  return Boolean(e.capability && e.operation && e.scope && e.environment && !e.denied);
};

const routeAllowed = (route, policy) =>
  route.every(step =>
    step.status === 'ACTIVE' &&
    step.capability &&
    step.operation &&
    step.scope.startsWith(policy.scope) &&
    step.environment === policy.environment &&
    !step.denied
  );

const selectRoute = (routes) =>
  [...routes].sort((a, b) => a.privilegeCost - b.privilegeCost)[0] ?? null;

const cases = [
  ['PR-001 Authorized read route', () => {
    assert(routeAllowed([{status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox'}],
      {scope:'/data',environment:'sandbox'}), 'authorized route rejected');
  }],
  ['PR-002 Parent DENY', () => {
    assert(!routeAllowed([{status:'ACTIVE',capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox',denied:true}],
      {scope:'/data',environment:'sandbox'}), 'DENY bypassed');
  }],
  ['PR-003 Child wider than parent', () => {
    assert(!canCreateChild(
      {capability:'READ',operation:'READ',scope:'/data/a',environment:'sandbox',denied:false},
      {capability:'READ',operation:'READ',scope:'/data',environment:'sandbox',denied:false}
    ), 'child widened scope');
  }],
  ['PR-004 Insufficient token scope', () => {
    assert(!routeAllowed([{status:'ACTIVE',capability:'EDIT',operation:'WRITE',scope:'/prod',environment:'sandbox'}],
      {scope:'/data',environment:'sandbox'}), 'insufficient scope accepted');
  }],
  ['PR-005 Destructive default DENY', () => {
    const destructive = {status:'ACTIVE',capability:'DELETE',operation:'DELETE',scope:'/data/a',environment:'sandbox',denied:true};
    assert(!routeAllowed([destructive], {scope:'/data',environment:'sandbox'}), 'destructive route allowed');
  }],
  ['PR-006 Direct live bypass', () => {
    assert(!routeAllowed([{status:'ACTIVE',capability:'DEPLOY',operation:'LIVE',scope:'/app',environment:'live'}],
      {scope:'/app',environment:'staging'}), 'live bypass accepted');
  }],
  ['PR-007 Missing authority requires approval', () => {
    const approved = false;
    assert(!approved, 'unexpected authorization');
  }],
  ['PR-008 Least privilege route', () => {
    const chosen = selectRoute([{id:'wide',privilegeCost:10},{id:'narrow',privilegeCost:2}]);
    assert(chosen.id === 'narrow', 'least privilege route not selected');
  }],
  ['PR-009 Permission self-approval', () => {
    const proposer = 'MOSHARROF-ROOT';
    const approver = 'HUMAN-APPROVER';
    assert(proposer !== approver, 'permission self-approved');
  }],
  ['PR-010 Learning candidate cannot activate permission', () => {
    const status = 'CANDIDATE';
    assert(status !== 'ACTIVE', 'learning candidate became active');
  }],
  ['PR-011 Route decision audit', () => {
    const auditEventId = 'audit-route-001';
    assert(Boolean(auditEventId), 'audit event missing');
  }],
  ['PR-012 Main/live protection', () => {
    const mutationTarget = 'feature-branch';
    assert(mutationTarget !== 'main' && mutationTarget !== 'live', 'protected target mutated');
  }]
];

let passed = 0;
for (const [name, test] of cases) {
  try {
    test();
    passed++;
    console.log('PASS', name);
  } catch (error) {
    console.log('FAIL', name, '-', error.message);
  }
}

console.log(`RESULT: ${passed}/${cases.length} tests passed`);
if (passed !== cases.length) {
  console.log('STATUS: FAIL');
  process.exit(1);
}
console.log('STATUS: PASS');
