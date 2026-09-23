/* Al-Quran Research — API v1 central router
   Current adapter remains read-only. D1 can replace the data adapter later.
*/
import { handleResearchApi } from './research-api.js';
import { API_VERSION, apiError, apiJson, apiOptions } from './api-v1-response.js';

export async function handleApiV1(request,env={}){
  const url=new URL(request.url);
  const origin=request.headers.get('Origin')||'';
  if(!url.pathname.startsWith('/api/v1'))return null;
  if(request.method==='OPTIONS')return apiOptions(origin);
  if(request.method!=='GET')return apiError('METHOD_NOT_ALLOWED','এই API সংস্করণে শুধু GET গ্রহণ করা হয়।',405,origin);
  if(url.pathname==='/api/v1/health')return apiJson({ok:true,api_version:API_VERSION,service:'al-quran-research-api',mode:env.DB?'d1-ready':'master-dataset-adapter',read_only:true},200,origin);
  if(url.pathname==='/api/v1')return apiJson({ok:true,api_version:API_VERSION,endpoints:[
    '/api/v1/health','/api/v1/status','/api/v1/surah/{surah_number}',
    '/api/v1/ayah/{surah_number}/{ayah_number}','/api/v1/word/{token_id}','/api/v1/search?q={query}'
  ]},200,origin);
  const response=await handleResearchApi(request);
  if(response){
    const headers=new Headers(response.headers);
    headers.set('X-API-Version',API_VERSION);
    headers.set('X-API-Mode',env.DB?'d1-ready':'master-dataset-adapter');
    return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  }
  return apiError('UNKNOWN_ENDPOINT','API endpoint পাওয়া যায়নি।',404,origin);
}
