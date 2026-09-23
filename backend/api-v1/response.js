const ALLOWED_ORIGINS = new Set(['https://mosharrof0000-ux.github.io']);

export function corsHeaders(origin = '') {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'https://mosharrof0000-ux.github.io',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

export function json(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(origin),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': status >= 400 ? 'no-store' : 'public, max-age=60'
    }
  });
}

export function options(origin = '') {
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}

export function error(code, message, status, origin = '', details = undefined) {
  return json({ ok: false, error: code, message, ...(details === undefined ? {} : { details }) }, status, origin);
}
