export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": status >= 400 ? "no-store" : "public, max-age=60",
      ...extraHeaders
    }
  });
}

export function error(code, message, status = 400, details = undefined) {
  const body = { ok: false, error: code, message };
  if (details !== undefined) body.details = details;
  return json(body, status);
}
