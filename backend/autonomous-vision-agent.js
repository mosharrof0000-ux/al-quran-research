export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-agent-access-token",
      "Content-Type": "application/json; charset=utf-8"
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: "POST required" }, 405, cors);

    const token = request.headers.get("x-agent-access-token");
    if (!token || token !== env.AGENT_SECRET_TOKEN) {
      return json({ status: "FAIL", error: "অনুমতি অস্বীকৃত" }, 401, cors);
    }

    try {
      const body = await request.json();
      const userTask = String(body?.request || "").trim();
      if (!userTask) return json({ status: "FAIL", error: "request প্রয়োজন" }, 400, cors);
      if (userTask.length > 4000) return json({ status: "FAIL", error: "request খুব বড়" }, 413, cors);

      const owner = env.GITHUB_OWNER;
      const repo = env.GITHUB_REPO;
      const api = `https://api.github.com/repos/${owner}/${repo}`;
      const gh = {
        "Authorization": `Bearer ${env.GITHUB_PAT}`,
        "Accept": "application/vnd.github+json",
        "User-Agent": "Al-Quran-Autonomous-Vision-Agent"
      };

      const sourceRes = await fetch(`${api}/contents/index.html?ref=main`, { headers: gh });
      if (!sourceRes.ok) throw new Error(`SOURCE_READ_${sourceRes.status}`);
      const source = await sourceRes.json();
      const currentCode = decodeBase64(source.content);

      const aiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text:
`You are the draft-only visual architect for the Al-Quran Research project.

NON-NEGOTIABLE:
- Return one complete HTML document only.
- Never request, expose, or modify secrets.
- Do not remove required project functionality.
- This output is a DRAFT only. It must never be treated as a live release.
- Do not include markdown fences.

CURRENT index.html:
${currentCode}

USER TASK:
${userTask}`
              }]
            }],
            generationConfig: { temperature: 0.2 }
          })
        }
      );

      if (!aiRes.ok) throw new Error(`AI_HTTP_${aiRes.status}`);
      const aiData = await aiRes.json();
      const raw = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) throw new Error("AI_EMPTY_RESPONSE");

      const updatedCode = cleanHtml(raw);
      validateHtml(updatedCode);

      const taskId = `VISION-${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0,14)}-${crypto.randomUUID().slice(0,8)}`;
      const path = `drafts/${taskId}/draft.html`;
      const metadataPath = `drafts/${taskId}/metadata.json`;

      const write = await putFile(api, path, updatedCode, `[Vision Draft] ${taskId}`, gh);
      if (!write.ok) throw new Error(`DRAFT_WRITE_${write.status}`);

      const metadata = {
        task_id: taskId,
        status: "DRAFT_CREATED",
        human_approval: false,
        release: false,
        source_file: "index.html",
        source_sha: source.sha,
        draft_path: path,
        draft_commit_sha: write.commitSha,
        created_at: new Date().toISOString(),
        task: userTask
      };

      const metaWrite = await putFile(
        api,
        metadataPath,
        JSON.stringify(metadata, null, 2),
        `[Vision Metadata] ${taskId}`,
        gh
      );
      if (!metaWrite.ok) throw new Error(`METADATA_WRITE_${metaWrite.status}`);

      return json({
        status: "PASS",
        result: {
          task_id: taskId,
          draft_path: path,
          demo_link: `https://${owner}.github.io/${repo}/${path}`,
          approval_required: true
        },
        gates: {
          source_read: "PASS",
          ai_response: "PASS",
          html_validation: "PASS",
          draft_write: "PASS",
          metadata_write: "PASS",
          human_approval: "NOT_TESTED",
          live_release: "BLOCKED"
        }
      }, 200, cors);
    } catch (err) {
      return json({
        status: "FAIL",
        error: String(err?.message || err),
        gates: { human_approval: "NOT_TESTED", live_release: "BLOCKED" }
      }, 500, cors);
    }
  }
};

function json(value, status, headers) {
  return new Response(JSON.stringify(value), { status, headers });
}

function decodeBase64(value) {
  const binary = atob(value.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function cleanHtml(value) {
  return value
    .replace(/^\\s*```(?:html)?\\s*/i, "")
    .replace(/\\s*```\\s*$/i, "")
    .trim();
}

function validateHtml(html) {
  if (html.length < 100) throw new Error("HTML_TOO_SHORT");
  if (html.length > 900000) throw new Error("HTML_TOO_LARGE");
  if (!/^<!doctype html>/i.test(html) && !/<html[\\s>]/i.test(html)) throw new Error("HTML_ROOT_MISSING");
  if (!/<body[\\s>]/i.test(html)) throw new Error("BODY_MISSING");
  if (!/<\\/html>/i.test(html)) throw new Error("HTML_CLOSE_MISSING");
  if (/<script[^>]*src=["'](?:https?:)?\\/\\//i.test(html)) {
    throw new Error("EXTERNAL_SCRIPT_POLICY_REVIEW_REQUIRED");
  }
}

async function putFile(api, path, content, message, headers) {
  const check = await fetch(`${api}/contents/${path}?ref=main`, { headers });
  let sha;
  if (check.ok) sha = (await check.json()).sha;

  const body = {
    message,
    content: encodeBase64(content),
    ...(sha ? { sha } : {})
  };

  return fetch(`${api}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(async r => ({
    ok: r.ok,
    status: r.status,
    commitSha: r.ok ? (await r.json()).commit?.sha || null : null
  }));
}

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}
