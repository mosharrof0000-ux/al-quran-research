export function jsonResponse(data, status = 200, extraHeaders = {}) {
  const headers = new Headers({ "Content-Type": "application/json; charset=utf-8", "X-API-Version": "1", ...extraHeaders });
  return new Response(JSON.stringify(data), { status, headers });
}
export function errorResponse(code, message, status, details) {
  const body = { ok: false, error: code, message };
  if (details !== undefined) body.details = details;
  return jsonResponse(body, status);
}
