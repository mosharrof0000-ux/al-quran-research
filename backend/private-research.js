/* Al-Quran Research — Private Research Library Access v1.1
   Server-side PIN validation and short-lived signed sessions.
   No source text is returned unless a verified source is installed and a session is valid.
*/
export const PRIVATE_LIBRARY_VERSION='1.1';
const PUBLIC_ORIGIN='https://mosharrof0000-ux.github.io';
const SESSION_TTL_SECONDS=900;
import { retrievePrivateResearchContext } from './private-research-retrieval.js';
const SOURCES=[
  {source_id:'SRC-IFB-001',name_bn:'ইসলামিক ফাউন্ডেশন — আল-কুরআনুল করীম',status:'PRIVATE',visibility:'PRIVATE',locked_by_default:true,installed:false,permission_status:'PENDING_VERIFICATION',storage_key:null,manifest_sha256:null}
];
function headers(origin){
  return {
    'Access-Control-Allow-Origin':origin===PUBLIC_ORIGIN?origin:PUBLIC_ORIGIN,
    'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type, Authorization',
    'Content-Type':'application/json; charset=utf-8',
    'Cache-Control':'no-store',
    'Pragma':'no-cache',
    'Vary':'Origin'
  };
}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:headers(origin)});}
function timingSafeEqual(a,b){
  if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;
  let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return x===0;
}
function toBase64Url(bytes){
  let binary='';for(const byte of bytes)binary+=String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function fromBase64Url(value){
  const normalized=String(value||'').replace(/-/g,'+').replace(/_/g,'/');
  const padded=normalized+'='.repeat((4-normalized.length%4)%4);
  const binary=atob(padded);return Uint8Array.from(binary,c=>c.charCodeAt(0));
}
async function importSigningKey(secret){
  return crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);
}
export async function createPrivateResearchSessionToken(sourceId,secret){
  const now=Math.floor(Date.now()/1000);
  const nonce=toBase64Url(crypto.getRandomValues(new Uint8Array(16)));
  const payload={sub:sourceId,iat:now,exp:now+SESSION_TTL_SECONDS,nonce};
  const encoded=toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const key=await importSigningKey(secret);
  const signature=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(encoded));
  return encoded+'.'+toBase64Url(new Uint8Array(signature));
}
export async function verifyPrivateResearchSessionToken(token,sourceId,secret){
  try{
    if(typeof token!=='string'||token.length>2048)return false;
    const parts=token.split('.');if(parts.length!==2)return false;
    const key=await importSigningKey(secret);
    const valid=await crypto.subtle.verify('HMAC',key,fromBase64Url(parts[1]),new TextEncoder().encode(parts[0]));
    if(!valid)return false;
    const payload=JSON.parse(new TextDecoder().decode(fromBase64Url(parts[0])));
    const now=Math.floor(Date.now()/1000);
    return payload?.sub===sourceId&&Number.isInteger(payload.iat)&&Number.isInteger(payload.exp)&&payload.iat<=now+60&&payload.exp>now&&payload.exp-payload.iat===SESSION_TTL_SECONDS&&typeof payload.nonce==='string'&&payload.nonce.length>=16;
  }catch{return false;}
}
export async function handlePrivateResearch(request,env,sources=SOURCES){
  const url=new URL(request.url);const origin=request.headers.get('Origin')||'';
  if(!url.pathname.startsWith('/private-research/'))return null;
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:headers(origin)});
  if(request.method==='GET'&&url.pathname==='/private-research/sources'){
    return json({ok:true,version:PRIVATE_LIBRARY_VERSION,sources:sources.map(({source_id,name_bn,status,visibility,locked_by_default,installed,permission_status})=>({source_id,name_bn,status,visibility,locked_by_default,installed,permission_status}))},200,origin);
  }
  if(request.method==='POST'&&url.pathname==='/private-research/unlock'){
    if(!env.PRIVATE_RESEARCH_PIN||!env.PRIVATE_RESEARCH_SESSION_SECRET||String(env.PRIVATE_RESEARCH_SESSION_SECRET).length<32)return json({ok:false,error:'PRIVATE_LIBRARY_NOT_CONFIGURED'},503,origin);
    let body;try{body=await request.json()}catch{return json({ok:false,error:'INVALID_JSON'},400,origin)}
    const sourceId=String(body?.source_id||'');const pin=String(body?.pin||'');
    if(pin.length<4||pin.length>128)return json({ok:false,error:'INVALID_PIN'},401,origin);
    const source=sources.find(s=>s.source_id===sourceId);
    if(!source)return json({ok:false,error:'UNKNOWN_PRIVATE_SOURCE'},404,origin);
    if(source.status!=='PRIVATE')return json({ok:false,error:'SOURCE_NOT_PRIVATE'},403,origin);
    if(!timingSafeEqual(pin,String(env.PRIVATE_RESEARCH_PIN)))return json({ok:false,error:'INVALID_PIN'},401,origin);
    if(!source.installed||!source.storage_key||!source.manifest_sha256)return json({ok:false,error:'SOURCE_NOT_INSTALLED',source_id:source.source_id,permission_status:source.permission_status},409,origin);
    try{
      const accessToken=await createPrivateResearchSessionToken(source.source_id,String(env.PRIVATE_RESEARCH_SESSION_SECRET));
      return json({ok:true,source_id:source.source_id,access:'GRANTED',access_token:accessToken,token_type:'Bearer',expires_in_seconds:SESSION_TTL_SECONDS},200,origin);
    }catch{return json({ok:false,error:'SESSION_ISSUE_FAILED'},503,origin);}
  }
  const contentMatch=url.pathname.match(/^\/private-research\/sources\/([A-Za-z0-9_-]+)\/content$/);
  if(request.method==='GET'&&contentMatch){
    const sourceId=contentMatch[1];const source=sources.find(s=>s.source_id===sourceId);
    if(!source)return json({ok:false,error:'UNKNOWN_PRIVATE_SOURCE'},404,origin);
    if(!env.PRIVATE_RESEARCH_SESSION_SECRET||String(env.PRIVATE_RESEARCH_SESSION_SECRET).length<32)return json({ok:false,error:'PRIVATE_LIBRARY_NOT_CONFIGURED'},503,origin);
    const authorization=request.headers.get('Authorization')||'';
    const token=authorization.startsWith('Bearer ')?authorization.slice(7):'';
    if(!await verifyPrivateResearchSessionToken(token,sourceId,String(env.PRIVATE_RESEARCH_SESSION_SECRET)))return json({ok:false,error:'PRIVATE_SESSION_REQUIRED'},401,origin);
    if(!source.installed||!source.storage_key||!source.manifest_sha256)return json({ok:false,error:'SOURCE_NOT_INSTALLED',permission_status:source.permission_status},409,origin);
    const ayahId=url.searchParams.get('ayah_id')||'';
    if(!/^S\d{3}-A\d{3}$/.test(ayahId))return json({ok:false,error:'CANONICAL_AYAH_SCOPE_REQUIRED'},400,origin);
    const retrieved=await retrievePrivateResearchContext({bucket:env.PRIVATE_RESEARCH_BUCKET,sourceId,manifestKey:source.storage_key,manifestSha256:source.manifest_sha256,ayahId});
    if(!retrieved.ok)return json({ok:false,error:retrieved.error},retrieved.status||503,origin);
    return json({ok:true,source_id:retrieved.source_id,edition_id:retrieved.edition_id,ayah_id:retrieved.ayah_id,chunks:retrieved.chunks},200,origin);
  }
  return json({ok:false,error:'PRIVATE_RESEARCH_ROUTE_NOT_FOUND'},404,origin);
}
