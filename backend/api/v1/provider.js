import { handleResearchApi } from "../../research-api.js";

export async function getResearch(request, env) {
  if (env && env.DB) return getFromD1(request, env);
  return handleResearchApi(request);
}

async function getFromD1(request, env) {
  const url = new URL(request.url);
  const p = url.pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  const json = (data, status=200) => new Response(JSON.stringify(data), {
    status, headers: {"Content-Type":"application/json; charset=utf-8"}
  });

  if (p[2] === "status") {
    const row = await env.DB.prepare(
      "SELECT dataset_version, schema_version, status FROM api_dataset_meta ORDER BY version DESC LIMIT 1"
    ).first();
    return json({
      api_version:"1.0",
      schema_version:row?.schema_version || "unknown",
      dataset_version:row?.dataset_version || "unknown",
      status:row?.status || "UNKNOWN",
      source:"d1"
    });
  }

  if (p[2] === "ayah" && p[3] && p[4]) {
    const row = await env.DB.prepare(
      "SELECT a.*, s.surah_number, s.name_ar, s.name_transliteration FROM ayah a JOIN surah s ON s.surah_id=a.surah_id WHERE s.surah_number=?1 AND a.ayah_number=?2 LIMIT 1"
    ).bind(Number(p[3]), Number(p[4])).first();
    if (!row) return json({error:"AYAH_NOT_FOUND"},404);
    return json(row);
  }

  return json({error:"D1_ENDPOINT_PENDING"},501);
}
