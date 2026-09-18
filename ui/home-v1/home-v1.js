const CHAT_ENDPOINT='https://al-quran-research.mosharrof0000.workers.dev';
const toastEl=document.getElementById('toast');
function toast(t){toastEl.textContent=t;toastEl.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toastEl.classList.remove('show'),1800)}
const drawer=document.getElementById('drawer');
const quranHome=document.getElementById('quranHome');
const sourceList=document.getElementById('sourceList');
const SOURCES=[{id:'language-quran',name:'ভাষাভিত্তিক কুরআন',meta:'আমাদের তৈরি প্রধান কুরআন • স্থায়ী ১ নম্বর',status:'প্রধান'},{id:'tanzil-uthmani',name:'Tanzil Uthmani',meta:'আরবি কুরআন • বর্তমান ইনস্টল করা Reader Source',status:'Source ২'}];
let activeQuranSource='tanzil-uthmani';
let pendingReaderJump=null;
function renderSources(){sourceList.innerHTML='';SOURCES.forEach((s,i)=>{const b=document.createElement('button');b.className='source-card';b.type='button';b.dataset.source=s.id;b.innerHTML='<div class="source-top"><span class="source-number">'+(i+1)+'</span><span class="source-name">'+s.name+'</span><span class="source-badge">'+s.status+'</span></div><div class="source-meta">'+s.meta+'</div>';b.onclick=()=>selectSource(s.id);sourceList.appendChild(b)})}
function openQuranHome(){quranHome.classList.add('open');renderSources();drawer.classList.remove('open')}
function closeQuranHome(){quranHome.classList.remove('open')}
function selectSource(id){activeQuranSource=id;if(id==='tanzil-uthmani'){closeQuranHome();reader.classList.add('open');showSura(Number(select.value||1));return}toast('ভাষাভিত্তিক কুরআন তৈরির ধাপ পরবর্তী পর্যায়ে শুরু হবে')}
function parseReaderJump(q){const text=String(q||'').trim();const suraMatch=text.match(/(?:সূরা|সুরা)\s*(?:নং\s*)?(\d{1,3}|[আ-হড়ঢ়য়ংঃৎ]+)(?:\s+নম্বর)?\s*(?:আয়াত|আয়াত|আয়াতের|আয়াতের)\s*(?:নং\s*)?(\d{1,3})/i);if(!suraMatch)return null;const names={বাকারা:2,'আল-বাকারা':2,'আল বাকারাহ':2,'ফাতিহা':1,'আল-ফাতিহা':1};const raw=suraMatch[1];const suraNumber=/^\d+$/.test(raw)?Number(raw):names[raw];const ayah=Number(suraMatch[2]);if(!suraNumber||suraNumber<1||suraNumber>114||!ayah||ayah<1||ayah>SURA_AYAH_COUNTS[suraNumber-1])return null;const lower=text.toLowerCase();const source=/(তানজিল|tanzil)/i.test(lower)?'tanzil-uthmani':activeQuranSource;return {source,sura:suraNumber,ayah}}
function openReaderAt(sura,ayah,source){if(source!=='tanzil-uthmani'){toast('এই Source-এর Reader এখনো প্রস্তুত হয়নি');return}activeQuranSource=source;pendingReaderJump=ayah;reader.classList.add('open');showSura(sura)}
document.getElementById('openQuranHome').onclick=openQuranHome;
document.getElementById('closeQuranHome').onclick=closeQuranHome;
document.getElementById('menuBtn').onclick=()=>drawer.classList.add('open');
document.getElementById('closeDrawer').onclick=()=>drawer.classList.remove('open');
document.getElementById('themeBtn').onclick=()=>{document.body.classList.toggle('light');toast('থিম পরিবর্তনের জায়গা প্রস্তুত')};
document.getElementById('profileBtn').onclick=()=>toast('প্রোফাইল প্যানেল');
document.getElementById('searchBtn').onclick=()=>document.getElementById('prompt').focus();
document.getElementById('plusBtn').onclick=()=>toast('গবেষণা অপশন');
document.getElementById('micBtn').onclick=()=>{if(!('webkitSpeechRecognition'in window||'SpeechRecognition'in window)){toast('এই ব্রাউজারে voice input নেই');return}const R=window.SpeechRecognition||window.webkitSpeechRecognition;const r=new R();r.lang='bn-BD';r.onresult=e=>document.getElementById('prompt').value=e.results[0][0].transcript;r.start();toast('শুনছি…')};
function addMessage(text,type){const box=document.getElementById('messages');const el=document.createElement('div');el.className='chat-message '+type;el.textContent=text;box.appendChild(el);box.scrollTop=box.scrollHeight;return el}
function setBusy(busy){document.getElementById('sendBtn').disabled=busy;document.getElementById('sendBtn').textContent=busy?'…':'↑'}
async function sendQuestion(){const prompt=document.getElementById('prompt');const q=prompt.value.trim();if(!q){toast('প্রশ্ন লিখুন বা বলুন');return}sessionStorage.setItem('aqr:lastQuestion',q);document.getElementById('welcome').style.display='none';addMessage(q,'user');const readerJump=parseReaderJump(q);prompt.value='';setBusy(true);const pending=addMessage('উত্তর তৈরি হচ্ছে…','ai pending');try{const response=await fetch(CHAT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,mode:'general'})});let data={};try{data=await response.json()}catch{}if(!response.ok)throw new Error(data.error||'AI সংযোগে সমস্যা হয়েছে।');pending.textContent=data.answer||'AI কোনো উত্তর দেয়নি।';if(readerJump)openReaderAt(readerJump.sura,readerJump.ayah,readerJump.source);if(data.provider)pending.dataset.provider=data.provider}catch(error){pending.textContent='দুঃখিত, AI সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।';toast(String(error.message||error))}finally{pending.classList.remove('pending');setBusy(false)}}
document.getElementById('sendBtn').onclick=sendQuestion;
document.getElementById('prompt').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendQuestion()}});

const SURA_NAMES=["আল-ফাতিহা","আল-বাকারা","আলে ইমরান","আন-নিসা","আল-মায়িদা","আল-আনআম","আল-আরাফ","আল-আনফাল","আত-তাওবা","ইউনুস","হুদ","ইউসুফ","আর-রাদ","ইবরাহিম","আল-হিজর","আন-নাহল","আল-ইসরা","আল-কাহফ","মারইয়াম","ত্ব-হা","আল-আম্বিয়া","আল-হাজ্জ","আল-মুমিনুন","আন-নূর","আল-ফুরকান","আশ-শুআরা","আন-নামল","আল-কাসাস","আল-আনকাবুত","আর-রূম","লুকমান","আস-সাজদাহ","আল-আহযাব","সাবা","ফাতির","ইয়াসিন","আস-সাফফাত","সাদ","আয-যুমার","গাফির","ফুসসিলাত","আশ-শূরা","আয-যুখরুফ","আদ-দুখান","আল-জাসিয়া","আল-আহকাফ","মুহাম্মাদ","আল-ফাতহ","আল-হুজুরাত","কাফ","আয-যারিয়াত","আত-তূর","আন-নাজম","আল-কামার","আর-রহমান","আল-ওয়াকিয়া","আল-হাদিদ","আল-মুজাদিলা","আল-হাশর","আল-মুমতাহিনা","আস-সাফ","আল-জুমুআ","আল-মুনাফিকুন","আত-তাগাবুন","আত-তালাক","আত-তাহরিম","আল-মুলক","আল-কলম","আল-হাক্কাহ","আল-মাআরিজ","নূহ","আল-জিন্ন","আল-মুযযাম্মিল","আল-মুদ্দাসসির","আল-কিয়ামাহ","আল-ইনসান","আল-মুরসালাত","আন-নাবা","আন-নাযিআত","আবাসা","আত-তাকভীর","আল-ইনফিতার","আল-মুতাফফিফিন","আল-ইনশিকাক","আল-বুরুজ","আত-তারিক","আল-আলা","আল-গাশিয়াহ","আল-ফজর","আল-বালাদ","আশ-শামস","আল-লাইল","আদ-দুহা","আশ-শারহ","আত-তিন","আল-আলাক","আল-কদর","আল-বাইয়্যিনাহ","আয-যিলযাল","আল-আদিয়াত","আল-কারিয়াহ","আত-তাকাসুর","আল-আসর","আল-হুমাযাহ","আল-ফিল","কুরাইশ","আল-মাউন","আল-কাওসার","আল-কাফিরুন","আন-নাসর","আল-মাসাদ","আল-ইখলাস","আল-ফালাক","আন-নাস"];
const QURAN_API='https://quranonlineread.com/api/surah/';
const BENGALI_TRANSLATION_API='https://quranenc.com/api/v1/translation/sura/bengali_zakaria/';
const BENGALI_PRONUNCIATION_API='https://datasets-server.huggingface.co/rows?dataset=anisafifi%2Fmultilingual-quran&config=default&split=all';
const SURA_AYAH_COUNTS=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
function quranSourceOffset(n){return SURA_AYAH_COUNTS.slice(0,n-1).reduce((a,b)=>a+b,0)}
const reader=document.getElementById('quranReader'),select=document.getElementById('suraSelect'),qtext=document.getElementById('quranText'),qstatus=document.getElementById('quranStatus');
SURA_NAMES.forEach((n,i)=>{const o=document.createElement('option');o.value=i+1;o.textContent=(i+1)+' — '+n;select.appendChild(o)});
function normalizeArabicPayload(payload,n){
  const verses=payload?.verses||payload?.ayahs||payload?.data?.verses||payload?.data?.ayahs||payload?.data||[];
  if(!Array.isArray(verses))return [];
  return verses.map((v,i)=>({numberInSurah:Number(v.numberInSurah||v.verse_number||v.aya||i+1),arabic:v.arabic||v.text||v.text_ar||''})).filter(v=>v.numberInSurah>=1&&v.numberInSurah<=SURA_AYAH_COUNTS[n-1]);
}
function normalizeTranslationPayload(payload){
  const rows=Array.isArray(payload)?payload:(payload?.data||payload?.ayahs||[]);
  return Array.isArray(rows)?rows.map(x=>({aya:Number(x.aya||x.verse_number),translation:String(x.translation||'')})).filter(x=>x.aya>0):[];
}
function normalizePronunciationPayload(payload){
  const rows=Array.isArray(payload?.rows)?payload.rows:[];
  return rows.map(x=>x.row||{}).map(x=>({verse:Number(x.verse_number||x.aya||0),text:String(x.transliteration_bn||'')})).filter(x=>x.verse>0);
}
async function showSura(n){
  n=Number(n); if(!Number.isInteger(n)||n<1||n>114)return;
  try{
    qstatus.textContent='সূরা '+n+' — '+SURA_NAMES[n-1]+' লোড হচ্ছে…';
    qtext.innerHTML='';
    select.value=String(n);
    const pronOffset=quranSourceOffset(n);
    const [arabicResponse,bnResponse,pronResponse]=await Promise.all([
      fetch(QURAN_API+n+'.json',{cache:'force-cache'}),
      fetch(BENGALI_TRANSLATION_API+n,{cache:'no-store'}),
      fetch(BENGALI_PRONUNCIATION_API+'&offset='+pronOffset+'&length='+SURA_AYAH_COUNTS[n-1],{cache:'no-store'})
    ]);
    if(!arabicResponse.ok)throw new Error('আরবি উৎস থেকে ডেটা পাওয়া যায়নি ('+arabicResponse.status+')');
    if(!bnResponse.ok)throw new Error('বাংলা অনুবাদ উৎস থেকে ডেটা পাওয়া যায়নি ('+bnResponse.status+')');
    const [arabicPayload,bnPayload,pronPayload]=await Promise.all([arabicResponse.json(),bnResponse.json(),pronResponse.ok?pronResponse.json():Promise.resolve({rows:[]})]);
    const verses=normalizeArabicPayload(arabicPayload,n);
    const translations=normalizeTranslationPayload(bnPayload);
    const pronunciationRows=normalizePronunciationPayload(pronPayload);
    const translationByAya=new Map(translations.map(x=>[x.aya,x.translation]));
    const pronunciationByAya=new Map(pronunciationRows.map(x=>[x.verse,x.text]));
    if(verses.length!==SURA_AYAH_COUNTS[n-1])throw new Error('সূরা '+n+'-এর পূর্ণ আরবি আয়াত পাওয়া যায়নি; Reader থামানো হয়েছে।');
    verses.forEach(v=>{
      const no=v.numberInSurah;
      const el=document.createElement('div');
      el.id='ayah-'+no;
      el.className='ayah';
      el.innerHTML='<span class="ayah-no">'+no+'</span><div class="ayah-body"><div class="ayah-ar">'+v.arabic+'</div><div class="ayah-bn-label">বাংলা উচ্চারণ</div><div class="ayah-pron">'+(pronunciationByAya.get(no)||'উচ্চারণ পাওয়া যায়নি')+'</div><div class="ayah-bn-label">বাংলা অনুবাদ</div><div class="ayah-bn">'+(translationByAya.get(no)||'অনুবাদ পাওয়া যায়নি')+'</div></div>';
      qtext.appendChild(el);
    });
    qstatus.textContent='সূরা '+n+' — '+SURA_NAMES[n-1]+' | '+verses.length+' আয়াত';
    if(translations.length!==verses.length)toast('বাংলা অনুবাদের কিছু আয়াত পাওয়া যায়নি');
    if(pronunciationRows.length!==verses.length)toast('বাংলা উচ্চারণের কিছু আয়াত পাওয়া যায়নি');
    if(pendingReaderJump){
      const target=document.getElementById('ayah-'+pendingReaderJump);
      if(target){target.scrollIntoView({behavior:'smooth',block:'center'});target.setAttribute('data-jump','true');setTimeout(()=>target.removeAttribute('data-jump'),2200)}
      pendingReaderJump=null;
    }
  }catch(e){qstatus.textContent='সমস্যা: '+e.message; qtext.innerHTML='<div class="reader-error">'+e.message+'</div>'}
}
document.getElementById('openReader').onclick=()=>{reader.classList.add('open');showSura(Number(select.value||1))};
document.getElementById('closeReader').onclick=()=>reader.classList.remove('open');
select.onchange=()=>showSura(Number(select.value));
document.getElementById('prevSura').onclick=()=>showSura(Math.max(1,Number(select.value)-1));
document.getElementById('nextSura').onclick=()=>showSura(Math.min(114,Number(select.value)+1));
