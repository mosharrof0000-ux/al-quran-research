/* Al-Quran Research — API v1 response/security layer */
export const API_VERSION='1.0';
const SECURITY_HEADERS={
  'Content-Type':'application/json; charset=utf-8',
  'X-Content-Type-Options':'nosniff',
  'Cache-Control':'public, max-age=60',
  'Vary':'Origin'
};
export function apiHeaders(origin,allowedOrigin='https://mosharrof0000-ux.github.io'){
  return {...SECURITY_HEADERS,
    'Access-Control-Allow-Origin':origin===allowedOrigin?origin:allowedOrigin,
    'Access-Control-Allow-Methods':'GET, OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type, Accept'};
}
export function apiJson(data,status=200,origin=''){
  return new Response(JSON.stringify(data),{status,headers:apiHeaders(origin)});
}
export function apiOptions(origin=''){return new Response(null,{status:204,headers:apiHeaders(origin)});}
export function apiError(code,message,status=400,origin=''){return apiJson({ok:false,error:code,message},status,origin);}
