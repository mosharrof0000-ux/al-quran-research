/* আল-কুরআন গবেষণা — Research API Entry v1.0
   নিরাপদ integration bridge.

   এই ফাইল বর্তমান AI Worker-কে পরিবর্তন করে না।
   ভবিষ্যৎ Worker routing-এর জন্য Research API-কে আলাদা entry point হিসেবে রাখে।
*/

import { handleResearchApi } from './research-api.js';

export default {
  async fetch(request) {
    const response = await handleResearchApi(request);

    // Research API এই request-এর জন্য দায়িত্ব না নিলে null ফেরায়।
    // মূল Worker পরে নিজের AI/অন্যান্য routing চালাতে পারবে।
    if (response) return response;

    return new Response(JSON.stringify({
      error: 'NOT_RESEARCH_API_ROUTE'
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
};
