/* আল-কুরআন রিসার্চ — API Gateway v1 foundation
   Read-only public routes first; write/admin routes remain isolated.
*/
import { handleResearchApi } from './research-api.js';

const API_VERSION='v1';
const ROUTES={
  status:'/api/v1/status',
  quran:'/api/v1/quran',
  surah:'/api/v1/surah/{surah_number}',
  ayah:'/api/v1/ayah/{surah_number}/{ayah_number}',
  word:'/api/v1/word/{token_id}',
  search:'/api/v1/search?q={query}',
  research:'/api/v1/research/{research_id}',
  ai:'/api/v1/ai'
};

export async function handleApiGateway(request, env, ctx){
  const url=new URL(request.url);
  if(!url.pathname.startsWith('/api/v1/')) return null;
  if(request.method==='OPTIONS') return new Response(null,{status:204,headers:gatewayCors(request)});
  const research=await handleResearchApi(request);
  if(research) return withGatewayHeaders(research);
  if(url.pathname==='/api/v1/health') return json({ok:true,api_version:API_VERSION,service:'al-quran-research-api'},200,request);
  if(url.pathname==='/api/v1/routes') return json({api_version:API_VERSION,routes:ROUTES},200,request);
  return json({ok:false,error:'UNKNOWN_API_ROUTE',api_version:API_VERSION},404,request);
}

function gatewayCors(request){
  const origin=request.headers.get('Origin')||'';
  const allowed=origin==='https://mosharrof0000-ux.github.io'?origin:'https://mosharrof0000-ux.github.io';
  return {'Access-Control-Allow-Origin':allowed,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Accept,Authorization','Vary':'Origin'};
}
function withGatewayHeaders(response){
  const h=new Headers(response.headers);
  h.set('X-API-Version',API_VERSION);
  h.set('Vary','Origin');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers:h});
}
function json(data,status,request){
  return new Response(JSON.stringify(data),{status,headers:{...gatewayCors(request),'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
}
