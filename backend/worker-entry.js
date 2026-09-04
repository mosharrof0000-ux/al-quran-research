/* আল-কুরআন গবেষণা — নিরাপদ Worker Entry Wrapper v1.0

বর্তমান worker.js অপরিবর্তিত রেখে Research API-কে সামনে আনার জন্য
এই wrapper ব্যবহার করা হবে। Research API route হলে সেটি response দেবে;
অন্য সব request বর্তমান worker.js-এ চলে যাবে।
*/

import worker from './worker.js';
import { handleResearchApi } from './research-api.js';

export default {
  async fetch(request, env, ctx) {
    const researchResponse = await handleResearchApi(request);

    if (researchResponse) {
      return researchResponse;
    }

    return worker.fetch(request, env, ctx);
  }
};
