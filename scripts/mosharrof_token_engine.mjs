#!/usr/bin/env node
'use strict';

function isUnder(parent, child) {
  if (parent === child) return true;
  const p = parent.endsWith('/') ? parent : parent + '/';
  return child.startsWith(p);
}

function resolveToken({permission, tokens, approval=false}) {
  if (!permission || !Array.isArray(tokens)) return {status:'BLOCKED', reason:'INVALID_REQUEST'};
  if (permission.denied) return {status:'DENIED', reason:'PARENT_POLICY_DENY'};
  if (permission.destructive && !approval) return {status:'DENIED', reason:'EXPLICIT_APPROVAL_REQUIRED'};
  if (permission.security_admin && !approval) return {status:'REQUIRES_APPROVAL', reason:'SECURITY_ADMIN_APPROVAL_REQUIRED'};

  const candidates = tokens.filter(t =>
    t.status === 'ACTIVE' &&
    t.capability === permission.capability &&
    t.operation === permission.operation &&
    t.environment === permission.environment &&
    isUnder(t.scope, permission.scope)
  );

  if (!candidates.length) return {status:'BLOCKED', reason:'NO_MATCHING_TOKEN'};

  candidates.sort((a,b) => (a.privilegeCost ?? Number.MAX_SAFE_INTEGER) - (b.privilegeCost ?? Number.MAX_SAFE_INTEGER));
  const selected = candidates[0];

  return {
    status:'AUTHORIZED',
    token_id:selected.token_id,
    effective_scope:permission.scope,
    environment:permission.environment,
    audit_required:true
  };
}

export { isUnder, resolveToken };
