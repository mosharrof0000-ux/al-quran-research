import { json, error } from "./response.js";

const ROUTES = new Map([
  ["GET /api/v1/health", "health"],
  ["GET /api/v1/status", "status"],
  ["GET /api/v1/surah/{surah}", "surah"],
  ["GET /api/v1/ayah/{surah}/{ayah}", "ayah"],
  ["GET /api/v1/word/{token}", "word"],
  ["GET /api/v1/search", "search"],
  ["POST /api/v1/ai", "ai"]
]);

export function apiRouteMap() {
  return Object.fromEntries(ROUTES);
}

function methodPath(request) {
  const url = new URL(request.url);
  return [request.method.toUpperCase(), url.pathname];
}

export async function handleApiV1(request, deps = {}) {
  const [method, pathname] = methodPath(request);

  if (method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  if (!pathname.startsWith("/api/v1/")) return null;

  if (method === "GET" && pathname === "/api/v1/health") {
    return json({
      ok: true,
      service: "al-quran-research-api",
      api_version: "v1",
      status: "healthy"
    });
  }

  if (method === "GET" && pathname === "/api/v1/status") {
    return json({
      ok: true,
      service: "al-quran-research-api",
      api_version: "v1",
      contract: "read-only-versioned",
      data_source: deps.dataSource || "master-dataset",
      database: deps.database || "not-connected"
    });
  }

  if (method === "GET" && pathname === "/api/v1/search") {
    const q = new URL(request.url).searchParams.get("q")?.trim() || "";
    if (!q) return error("QUERY_REQUIRED", "q parameter is required.", 400);
    if (q.length > 200) return error("QUERY_TOO_LONG", "q parameter is too long.", 413);
    if (!deps.search) return error("SEARCH_NOT_READY", "Search service is not connected yet.", 503);
    return deps.search(q, request);
  }

  const ayah = pathname.match(/^\/api\/v1\/ayah\/(\d+)\/(\d+)$/);
  if (method === "GET" && ayah) {
    const surah = Number(ayah[1]), verse = Number(ayah[2]);
    if (surah < 1 || surah > 114 || verse < 1) return error("INVALID_REFERENCE", "Invalid surah/ayah reference.", 400);
    if (!deps.getAyah) return error("DATA_SOURCE_NOT_READY", "Ayah data source is not connected yet.", 503);
    return deps.getAyah(surah, verse, request);
  }

  const surah = pathname.match(/^\/api\/v1\/surah\/(\d+)$/);
  if (method === "GET" && surah) {
    const number = Number(surah[1]);
    if (number < 1 || number > 114) return error("INVALID_SURAH", "Invalid surah number.", 400);
    if (!deps.getSurah) return error("DATA_SOURCE_NOT_READY", "Surah data source is not connected yet.", 503);
    return deps.getSurah(number, request);
  }

  if (method === "GET" && pathname.startsWith("/api/v1/word/")) {
    const token = decodeURIComponent(pathname.slice("/api/v1/word/".length));
    if (!token || token.length > 200) return error("INVALID_TOKEN", "Invalid token id.", 400);
    if (!deps.getWord) return error("DATA_SOURCE_NOT_READY", "Word data source is not connected yet.", 503);
    return deps.getWord(token, request);
  }

  if (method === "POST" && pathname === "/api/v1/ai") {
    if (!deps.ai) return error("AI_NOT_READY", "AI service is not connected yet.", 503);
    return deps.ai(request);
  }

  return error("NOT_FOUND", "API endpoint not found.", 404, { endpoints: apiRouteMap() });
}
