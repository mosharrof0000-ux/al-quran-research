/* Al-Quran Research — Private Research Library Access v1.0
   Access-control contract only. No private source text is stored in public assets.
*/
export const PRIVATE_LIBRARY_VERSION='1.0';

const PUBLIC_ORIGIN='https://mosharrof0000-ux.github.io';

const SOURCES=[
  {source_id:'SRC-IFB-001',name_bn:'ইসলামিক ফাউন্ডেশন — আল-কুরআনুল করীম',status:'PRIVATE',visibility:'PRIVATE',locked_by_default:true,installed:false,permission_status:'PENDING_VERIFICATION'},
];

function headers(origin){
  return {
    'Access-Control-Allow-Origin':origin===PUBLIC_ORIGIN?origin:PUBLIC_ORIGIN,
    'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type',
    'Content-Type':'application/json; charset=utf-8',
    'Cache-Control':'no-store',
    'Vary':'Origin'
  };
}
function json(data,status,origin){return new Response(JSON.stringify(data),{status,headers:headers(origin)});}

function timingSafeEqual(a,b){
  if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;
  let x=0;for(let i=0;i<a.length;i++)x|=a.charCodeAt(i)^b.charCodeAt(i);return x===0;
}

export async function handlePrivateResearch(request,env){
  const url=new URL(request.url);const origin=request.headers.get('Origin')||'';
  if(!url.pathname.startsWith('/private-research/'))return null;
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:headers(origin)});
  if(request.method==='GET'&&url.pathname==='/private-research/sources'){
    return json({ok:true,version:PRIVATE_LIBRARY_VERSION,sources:SOURCES.map(({source_id,name_bn,status,visibility,locked_by_default,installed,permission_status})=>({source_id,name_bn,status,visibility,locked_by_default,installed,permission_status}))},200,origin);
  }
  if(request.method==='POST'&&url.pathname==='/private-research/unlock'){
    if(!env.PRIVATE_RESEARCH_PIN)return json({ok:false,error:'PRIVATE_LIBRARY_NOT_CONFIGURED'},503,origin);
    let body;try{body=await request.json()}catch{return json({ok:false,error:'INVALID_JSON'},400,origin)}
    const sourceId=String(body?.source_id||'');const pin=String(body?.pin||'');
    const source=SOURCES.find(s=>s.source_id===sourceId);
    if(!source)return json({ok:false,error:'UNKNOWN_PRIVATE_SOURCE'},404,origin);
    if(source.status!=='PRIVATE')return json({ok:false,error:'SOURCE_NOT_PRIVATE'},403,origin);
    if(!timingSafeEqual(pin,String(env.PRIVATE_RESEARCH_PIN)))return json({ok:false,error:'INVALID_PIN'},401,origin);
    if(!source.installed)return json({ok:false,error:'SOURCE_NOT_INSTALLED',source_id:source.source_id,permission_status:source.permission_status},409,origin);
    return json({ok:true,source_id:source.source_id,access:'GRANTED',expires_in_seconds:900},200,origin);
  }
  return json({ok:false,error:'PRIVATE_RESEARCH_ROUTE_NOT_FOUND'},404,origin);
}
