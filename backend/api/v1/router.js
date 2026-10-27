import { getResearch } from "./provider.js";
import { errorResponse } from "./response.js";

export async function routeV1(request, env) {
  const url = new URL(request.url);
  const p = url.pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  if (p[0] !== "api" || p[1] !== "v1") return null;
  if (request.method !== "GET") return errorResponse("METHOD_NOT_ALLOWED","এই API endpoint বর্তমানে শুধু GET গ্রহণ করে।",405);
  try {
    return await getResearch(request, env);
  } catch (error) {
    return errorResponse("API_INTERNAL_ERROR","API data service সাময়িকভাবে পাওয়া যাচ্ছে না।",503,String(error?.message || error).slice(0,300));
  }
}
