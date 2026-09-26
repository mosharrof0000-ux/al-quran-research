/* আল-কুরআন গবেষণা — Research API Adapter v1.1
   D1-first, read-only, versioned API.
   D1 binding: env.DB
   Transitional fallback: data/fatiha-master-v1.json
*/

const DATA_URL='https://raw.githubusercontent.com/mosharrof0000-ux/al-quran-research/main/data/fatiha-master-v1.json';
const CACHE_KEY='al-quran-research:master:v1';

function apiJson(data,status=200){
  return new Response(JSON.stringify(data),{
    status,
    headers:{
      'Content-Type':'application/json; charset=utf-8',
      'Cache-Control':status>=400?'no-store':'public, max-age=60'
    }
  });
}
function pathParts(pathname){return pathname.replace(/^\/+|\/+$/g,'').split('/').filter(Boolean);}
function validNumber(value,min,max){const n=Number(value);return Number.isInteger(n)&&n>=min&&n<=max?n:null;}

async function loadJsonDataset(){
  const key=new Request('https://cache.local/'+CACHE_KEY);
  const cached=await caches.default.match(key);
  if(cached)return cached.json();
  const response=await fetch(DATA_URL,{headers:{Accept:'application/json'},cf:{cacheTtl:60,cacheEverything:true}});
  if(!response.ok)throw new Error('MASTER_DATASET_FETCH_'+response.status);
  const data=await response.json();
  const dataset=data&&typeof data.content==='string'?JSON.parse(data.content):data;
  await caches.default.put(key,new Response(JSON.stringify(dataset),{headers:{'Content-Type':'application/json'}}));
  return dataset;
}
function fallbackSurahs(db){
  if(Array.isArray(db?.surahs))return db.surahs;
  if(db?.surah&&typeof db.surah==='object')return [{...db.surah,name_bengali:db.surah.name_bn,ayahs:Array.isArray(db.ayahs)?db.ayahs:[]}];
  return [];
}
function dbReady(env){return Boolean(env?.DB);}
async function d1Status(env){
  const row=await env.DB.prepare('SELECT dataset_version,schema_version,status,source_file FROM dataset_release ORDER BY released_at DESC LIMIT 1').first();
  const api=await env.DB.prepare('SELECT api_version,schema_version,status FROM api_schema_version WHERE api_version=?').bind('1.1').first();
  return {api_version:api?.api_version||'1.1',schema_version:api?.schema_version||row?.schema_version||'unknown',dataset_version:row?.dataset_version||'unknown',status:row?.status||'UNKNOWN',source:row?.source_file||'D1',storage:'D1'};
}
async function d1Surah(env,n){
  const surah=await env.DB.prepare('SELECT surah_id,surah_number,name_ar,name_transliteration,status,version FROM surah WHERE surah_number=? AND status=?').bind(n,'ACTIVE').first();
  if(!surah)return null;
  const {results}=await env.DB.prepare('SELECT ayah_id,ayah_number,arabic_text,text_version,status FROM ayah WHERE surah_id=? AND status=? ORDER BY ayah_number').bind(surah.surah_id,'ACTIVE').all();
  return {...surah,ayahs:results||[]};
}
async function d1Ayah(env,surahNumber,ayahNumber){
  const row=await env.DB.prepare(`SELECT s.surah_number,s.name_ar,s.name_transliteration,a.ayah_id,a.ayah_number,a.arabic_text,a.text_version,a.status
    FROM surah s JOIN ayah a ON a.surah_id=s.surah_id
    WHERE s.surah_number=? AND a.ayah_number=? AND s.status='ACTIVE' AND a.status='ACTIVE'`).bind(surahNumber,ayahNumber).first();
  if(!row)return null;
  const {results}=await env.DB.prepare(`SELECT t.token_id,t.position,t.surface_form,t.normalized_form,
    p.pronunciation AS bengali_pronunciation,
    m.part_of_speech,m.features_json
    FROM token t
    LEFT JOIN pronunciation p ON p.token_id=t.token_id AND p.language_code='bn' AND p.version=(SELECT MAX(p2.version) FROM pronunciation p2 WHERE p2.token_id=t.token_id AND p2.language_code='bn')
    LEFT JOIN morphology m ON m.token_id=t.token_id
    WHERE t.ayah_id=? AND t.status='ACTIVE' ORDER BY t.position`).bind(row.ayah_id).all();
  return {...row,tokens:results||[],source:'D1'};
}
async function d1Word(env,tokenId){
  return env.DB.prepare(`SELECT t.token_id,t.position,t.surface_form,t.normalized_form,t.ayah_id,
    a.ayah_number,s.surah_number,
    p.pronunciation AS bengali_pronunciation,p.system AS pronunciation_system,
    m.part_of_speech,m.features_json,
    l.lemma,r.root_form,r.root_system,r.status AS root_status
    FROM token t JOIN ayah a ON a.ayah_id=t.ayah_id JOIN surah s ON s.surah_id=a.surah_id
    LEFT JOIN token_lexeme tl ON tl.token_id=t.token_id
    LEFT JOIN lexeme l ON l.lexeme_id=tl.lexeme_id
    LEFT JOIN root r ON r.root_id=l.root_id
    LEFT JOIN pronunciation p ON p.token_id=t.token_id AND p.language_code='bn' AND p.version=(SELECT MAX(p2.version) FROM pronunciation p2 WHERE p2.token_id=t.token_id AND p2.language_code='bn')
    LEFT JOIN morphology m ON m.token_id=t.token_id
    WHERE t.token_id=? AND t.status='ACTIVE'`).bind(tokenId).first();
}
async function d1Search(env,q,limit){
  const like='%'+q.replace(/[\\%_]/g,'\\$&')+'%';
  const {results}=await env.DB.prepare(`SELECT s.surah_number,a.ayah_number,a.ayah_id,a.arabic_text
    FROM ayah a JOIN surah s ON s.surah_id=a.surah_id
    WHERE a.status='ACTIVE' AND (a.arabic_text LIKE ? ESCAPE '\\' OR a.ayah_id LIKE ? ESCAPE '\\')
    ORDER BY s.surah_number,a.ayah_number LIMIT ?`).bind(like,like,limit).all();
  return results||[];
}

export async function handleResearchApi(request,env={}){
  const url=new URL(request.url);const parts=pathParts(url.pathname);
  if(parts[0]!=='api'||parts[1]!=='v1')return null;
  if(request.method!=='GET')return apiJson({ok:false,error:'METHOD_NOT_ALLOWED'},405);

  try{
    if(parts[2]==='status'){
      if(dbReady(env))return apiJson(await d1Status(env));
      const db=await loadJsonDataset();
      return apiJson({api_version:'1.1',schema_version:db.schema_version||'unknown',dataset_version:db.dataset_version||'unknown',status:db.status||'unknown',source:'master-dataset',storage:'github-json-fallback'});
    }

    if(parts[2]==='surah'&&parts[3]){
      const n=validNumber(parts[3],1,114);if(!n)return apiJson({ok:false,error:'INVALID_SURAH'},400);
      if(dbReady(env)){const row=await d1Surah(env,n);return row?apiJson(row):apiJson({ok:false,error:'SURAH_NOT_FOUND'},404);}
      const db=await loadJsonDataset();const row=fallbackSurahs(db).find(s=>Number(s.surah_number)===n);
      return row?apiJson(row):apiJson({ok:false,error:'SURAH_NOT_FOUND'},404);
    }

    if(parts[2]==='ayah'&&parts[3]&&parts[4]){
      const sn=validNumber(parts[3],1,114),an=validNumber(parts[4],1,300);
      if(!sn||!an)return apiJson({ok:false,error:'INVALID_AYAH_REFERENCE'},400);
      if(dbReady(env)){const row=await d1Ayah(env,sn,an);return row?apiJson(row):apiJson({ok:false,error:'AYAH_NOT_FOUND'},404);}
      const db=await loadJsonDataset();const surah=fallbackSurahs(db).find(s=>Number(s.surah_number)===sn);const ayah=surah?.ayahs?.find(a=>Number(a.ayah_number)===an);
      return ayah?apiJson({surah_number:sn,surah_name:surah.name_bengali||surah.name_bn||surah.name_ar,...ayah,source:'master-dataset'}):apiJson({ok:false,error:'AYAH_NOT_FOUND'},404);
    }

    if(parts[2]==='word'&&parts[3]){
      const tokenId=parts.slice(3).join('/');if(tokenId.length>160)return apiJson({ok:false,error:'INVALID_TOKEN_ID'},400);
      if(dbReady(env)){const row=await d1Word(env,tokenId);return row?apiJson(row):apiJson({ok:false,error:'WORD_NOT_FOUND'},404);}
      const db=await loadJsonDataset();
      for(const surah of fallbackSurahs(db))for(const ayah of (surah.ayahs||[])){const token=(ayah.tokens||[]).find(t=>t.token_id===tokenId);if(token)return apiJson({surah_number:surah.surah_number,ayah_number:ayah.ayah_number,...token,source:'master-dataset'});}
      return apiJson({ok:false,error:'WORD_NOT_FOUND'},404);
    }

    if(parts[2]==='search'){
      const q=String(url.searchParams.get('q')||'').trim();const limit=Math.min(Math.max(Number(url.searchParams.get('limit')||25),1),100);
      if(!q)return apiJson({query:'',count:0,results:[]});
      if(q.length>200)return apiJson({ok:false,error:'QUERY_TOO_LONG'},413);
      if(dbReady(env)){const results=await d1Search(env,q,limit);return apiJson({query:q,count:results.length,limit,results,source:'D1'});}
      const db=await loadJsonDataset(),needle=q.toLowerCase(),results=[];
      for(const surah of fallbackSurahs(db))for(const ayah of (surah.ayahs||[])){if(JSON.stringify(ayah).toLowerCase().includes(needle)){results.push({surah_number:surah.surah_number,ayah_number:ayah.ayah_number,ayah_id:ayah.ayah_id,arabic_text:ayah.arabic_text,analysis_status:ayah.analysis_status});if(results.length>=limit)break;}if(results.length>=limit)break;}
      return apiJson({query:q,count:results.length,limit,results,source:'master-dataset'});
    }

    return apiJson({ok:false,error:'UNKNOWN_ENDPOINT',endpoints:['/api/v1/status','/api/v1/surah/{surah_number}','/api/v1/ayah/{surah_number}/{ayah_number}','/api/v1/word/{token_id}','/api/v1/search?q={query}&limit=25']},404);
  }catch(error){
    return apiJson({ok:false,error:'RESEARCH_DATA_UNAVAILABLE',message:'গবেষণা ডেটা এখন পাওয়া যাচ্ছে না।',detail:String(error?.message||error).slice(0,300)},503);
  }
}
