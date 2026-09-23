export function positiveInt(value, name, { min = 1, max = 1000 } = {}) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) {
    throw new Error(name + '_INVALID');
  }
  return n;
}

export function boundedQuery(value, { max = 200 } = {}) {
  const q = String(value || '').trim();
  if (q.length > max) throw new Error('QUERY_TOO_LONG');
  return q;
}

export function pathParts(pathname) {
  return pathname.replace(/^\\/+|\\/+$/g, '').split('/').filter(Boolean);
}
