const CHAT_ENDPOINT='https://al-quran-research.mosharrof0000.workers.dev';
const PRIVATE_RESEARCH_ENDPOINT=CHAT_ENDPOINT+'/private-research';
const toastEl=document.getElementById('toast');
function toast(t){toastEl.textContent=t;toastEl.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>toastEl.classList.remove('show'),1800)}
const AQR_AI_ICON_NAMES=new Set(['quran','ayah','research','analysis','translation','tafsir','document','info','verified','success','user','settings','bookmark','reference','warning']);
const AQR_AI_ICON_FALLBACKS=[['গবেষণা','research'],['বিশ্লেষণ','analysis'],['অনুবাদ','translation'],['তাফসির','tafsir'],['আয়াত','ayah'],['আয়াত','ayah'],['কুরআন','quran'],['সূরা','quran'],['যাচাই','verified'],['তথ্য','info']];
function iconNameFromQuestion(q){for(const [word,name] of AQR_AI_ICON_FALLBACKS)if(String(q||'').includes(word))return name;return 'quran'}
function renderAiIcon(body,iconName){
  const name=AQR_AI_ICON_NAMES.has(iconName)?iconName:'quran';
  const holder=document.createElement('div');holder.className='ai-semantic-icon';holder.setAttribute('aria-label','AI নির্বাচিত আইকন');
  holder.appendChild(AQRIcon.create(name,{color:'#123A63',size:24,strokeWidth:2.4,title:name}));
  body.prepend(holder);
}
function renderGeminiAnswer(body,text,question){
  const raw=String(text||'');
  const match=raw.match(/\\[\\[AQR_ICON:(quran|ayah|research|analysis|translation|tafsir|document|info|verified|success|user|settings|bookmark|reference|warning)\\]\\]/i);
  const icon=match?match[1].toLowerCase():iconNameFromQuestion(question);
  const clean=raw.replace(/\\[\\[AQR_ICON:[^\\]]+\\]\\]/gi,'').trim();
  body.textContent=clean;
  renderAiIcon(body,icon);
  return icon;
}
const drawer=document.getElementById('drawer');
const quranHome=document.getElementById('quranHome');
const sourceList=document.getElementById('sourceList');
const SOURCES=[{id:'language-quran',name:'ভাষাভিত্তিক কুরআন',meta:'আমাদের তৈরি প্রধান কুরআন • স্থায়ী ১ নম্বর',status:'প্রধান'},{id:'tanzil-uthmani',name:'Tanzil Uthmani',meta:'আরবি কুরআন • বর্তমান ইনস্টল করা Reader Source',status:'Source ২'}];
let activeQuranSource='tanzil-uthmani';
let pendingReaderJump=null;
function renderSources(){sourceList.innerHTML='';SOURCES.forEach((s,i)=>{const b=document.createElement('button');b.className='source-card';b.type='button';b.dataset.source=s.id;b.innerHTML='<div class="source-top"><span class="source-number">'+(i+1)+'</span><span class="source-name">'+s.name+'</span><span class="source-badge">'+s.status+'</span></div><div class="source-meta">'+s.meta+'</div>';b.onclick=()=>selectSource(s.id);sourceList.appendChild(b)})}
function openQuranHome(){quranHome.classList.add('open');renderSources();drawer.classList.remove('open')}
function closeQuranHome(){quranHome.classList.remove('open')}
function selectSource(id){activeQuranSource=id;closeQuranHome();reader.classList.add('open');showSura(Number(select.value||1),id)}
function parseReaderJump(q){const text=String(q||'').trim();const suraMatch=text.match(/(?:সূরা|সুরা)\s*(?:নং\s*)?(\d{1,3}|[আ-হড়ঢ়য়ংঃৎ]+)(?:\s+নম্বর)?\s*(?:আয়াত|আয়াত|আয়াতের|আয়াতের)\s*(?:নং\s*)?(\d{1,3})/i);if(!suraMatch)return null;const names={বাকারা:2,'আল-বাকারা':2,'আল বাকারাহ':2,'ফাতিহা':1,'আল-ফাতিহা':1};const raw=suraMatch[1];const suraNumber=/^\d+$/.test(raw)?Number(raw):names[raw];const ayah=Number(suraMatch[2]);if(!suraNumber||suraNumber<1||suraNumber>114||!ayah||ayah<1||ayah>SURA_AYAH_COUNTS[suraNumber-1])return null;const lower=text.toLowerCase();const source=/(তানজিল|tanzil)/i.test(lower)?'tanzil-uthmani':activeQuranSource;return {source,sura:suraNumber,ayah}}
function openReaderAt(sura,ayah,source){if(source!=='tanzil-uthmani'){toast('এই Source-এর Reader এখনো প্রস্তুত হয়নি');return}activeQuranSource=source;pendingReaderJump=ayah;reader.classList.add('open');showSura(sura)}
document.getElementById('openQuranHome').onclick=openQuranHome;
document.getElementById('closeQuranHome').onclick=closeQuranHome;
document.getElementById('menuBtn').onclick=()=>drawer.classList.add('open');
document.getElementById('closeDrawer').onclick=()=>drawer.classList.remove('open');
document.getElementById('themeBtn').onclick=()=>{const night=document.body.classList.toggle('night');document.body.classList.toggle('light',!night);toast(night?'রাতের ১৬ রঙ চালু হয়েছে':'দিনের ১৬ রঙ চালু হয়েছে')};
document.getElementById('profileBtn').onclick=openDrawer;
document.getElementById('searchBtn').onclick=()=>document.getElementById('prompt').focus();
const composerTools=document.getElementById('composerTools');
const plusBtn=document.getElementById('plusBtn');
function closeComposerTools(){composerTools.hidden=true;plusBtn.setAttribute('aria-expanded','false')}
plusBtn.onclick=()=>{const open=composerTools.hidden;composerTools.hidden=!open;plusBtn.setAttribute('aria-expanded',String(open))};
composerTools.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{const labels={ayah:'📖 আয়াত',research:'🔎 গবেষণা',word:'🔤 শব্দ / Root',file:'📎 ফাইল',math:'🧮 গণনা'};if(b.dataset.tool==='private-research'){closeComposerTools();openPrivateResearch();return}document.getElementById('prompt').placeholder=labels[b.dataset.tool]+' নিয়ে প্রশ্ন লিখুন...';document.getElementById('prompt').focus();closeComposerTools()});
const privateDialog=document.getElementById('privateResearchDialog');
const privateStatus=document.getElementById('privateResearchStatus');
const privateSources=document.getElementById('privateResearchSources');
const privateUnlock=document.getElementById('privateResearchUnlock');
const privatePin=document.getElementById('privateResearchPin');
let selectedPrivateSource=null;
function openPrivateResearch(){privateDialog.hidden=false;privateStatus.textContent='Private Source তালিকা লোড হচ্ছে…';privateSources.innerHTML='';privateUnlock.hidden=true;selectedPrivateSource=null;loadPrivateResearchSources()}
function closePrivateResearch(){privateDialog.hidden=true;privatePin.value='';selectedPrivateSource=null}
async function loadPrivateResearchSources(){
  try{
    const r=await fetch(PRIVATE_RESEARCH_ENDPOINT+'/sources',{cache:'no-store'});
    const data=await r.json();
    if(!r.ok)throw new Error(data.error||'Private Source তালিকা পাওয়া যায়নি');
    privateStatus.textContent='গবেষণার জন্য Private Source নির্বাচন করুন।';
    (data.sources||[]).forEach(s=>{
      const row=document.createElement('div');row.className='private-source-row';
      const label=document.createElement('span');label.textContent='🔒 '+s.name_bn+' — '+s.permission_status;
      const b=document.createElement('button');b.type='button';b.textContent='খুলুন';
      b.onclick=()=>{selectedPrivateSource=s.source_id;privateUnlock.hidden=false;privatePin.focus();privateStatus.textContent='এই Source-এর server-side PIN দিন।'};
      row.append(label,b);privateSources.appendChild(row);
    });
    if(!(data.sources||[]).length)privateStatus.textContent='কোনো Private Source নিবন্ধিত নেই।';
  }catch(e){privateStatus.textContent='Private Library সংযোগ পাওয়া যায়নি।'}
}
document.getElementById('closePrivateResearch').onclick=closePrivateResearch;
document.getElementById('privateResearchUnlockBtn').onclick=async()=>{
  if(!selectedPrivateSource){toast('আগে একটি Source নির্বাচন করুন');return}
  const pin=privatePin.value.trim();if(!pin){toast('PIN দিন');return}
  try{
    const r=await fetch(PRIVATE_RESEARCH_ENDPOINT+'/unlock',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({source_id:selectedPrivateSource,pin})});
    const data=await r.json();
    if(!r.ok){toast(data.error==='SOURCE_NOT_INSTALLED'?'এই Private Source এখনো ইনস্টল করা হয়নি।':data.error==='INVALID_PIN'?'PIN সঠিক নয়।':'Private Source খোলা যায়নি।');return}
    toast('Private Source খোলা হয়েছে');
    privateStatus.textContent='Access granted — গবেষণা context সক্রিয়।';
    privateUnlock.hidden=true;privatePin.value='';
  }catch(e){toast('Private Research সংযোগে সমস্যা হয়েছে।')}
};
privatePin.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('privateResearchUnlockBtn').click()});
document.getElementById('micBtn').onclick=()=>{if(!('webkitSpeechRecognition'in window||'SpeechRecognition'in window)){toast('এই ব্রাউজারে voice input নেই');return}const R=window.SpeechRecognition||window.webkitSpeechRecognition;const r=new R();r.lang='bn-BD';r.onresult=e=>document.getElementById('prompt').value=e.results[0][0].transcript;r.start();toast('শুনছি…')};
function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function markdownToSafeHtml(text){
 const escaped=escapeHtml(text); const lines=escaped.split(/\n/); let html='',inList=false;
 for(const line of lines){
   if(/^###\s+/.test(line)){if(inList){html+='</ul>';inList=false}html+='<h3>'+line.replace(/^###\s+/,'')+'</h3>';continue}
   if(/^##\s+/.test(line)){if(inList){html+='</ul>';inList=false}html+='<h2>'+line.replace(/^##\s+/,'')+'</h2>';continue}
   if(/^#\s+/.test(line)){if(inList){html+='</ul>';inList=false}html+='<h1>'+line.replace(/^#\s+/,'')+'</h1>';continue}
   if(/^[-*]\s+/.test(line)){if(!inList){html+='<ul>';inList=true}html+='<li>'+line.replace(/^[-*]\s+/,'')+'</li>';continue}
   if(/^\d+[.)]\s+/.test(line)){if(inList){html+='</ul>';inList=false}html+='<p><strong>'+line.match(/^\d+[.)]/)[0]+'</strong> '+line.replace(/^\d+[.)]\s+/,'')+'</p>';continue}
   if(/^>\s+/.test(line)){if(inList){html+='</ul>';inList=false}html+='<blockquote>'+line.replace(/^>\s+/,'')+'</blockquote>';continue}
   if(!line.trim()){if(inList){html+='</ul>';inList=false}continue}
   if(inList){html+='</ul>';inList=false}
   html+='<p>'+line.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')+'</p>';
 }
 if(inList)html+='</ul>'; return html;
}
function addMessage(text,type){
 const box=document.getElementById('messages'),el=document.createElement('div');el.className='chat-message '+type;
 const body=document.createElement('div');body.className='message-body';body.textContent=text;el.appendChild(body);
 if(type.includes('ai')){
   const actions=document.createElement('div');actions.className='message-actions';actions.hidden=true;
   const makeBtn=(label,title,handler)=>{const b=document.createElement('button');b.type='button';b.className='message-action';b.textContent=label;b.title=title;b.setAttribute('aria-label',title);b.onclick=handler;actions.appendChild(b);return b};
   makeBtn('📋','কপি',()=>copyAiMessage(body.textContent));
   const like=makeBtn('👍','ভালো লেগেছে',()=>{like.classList.toggle('active');dislike.classList.remove('active');toast(like.classList.contains('active')?'পছন্দ সংরক্ষিত':'পছন্দ সরানো হয়েছে')});
   const dislike=makeBtn('👎','ভালো লাগেনি',()=>{dislike.classList.toggle('active');like.classList.remove('active');toast(dislike.classList.contains('active')?'মতামত সংরক্ষিত':'মতামত সরানো হয়েছে')});
   makeBtn('🔊','পড়ে শোনান',()=>speakAiMessage(body.textContent));makeBtn('↗','শেয়ার',()=>shareAiMessage(body.textContent));
   const moreWrap=document.createElement('div');moreWrap.className='message-more';const moreMenu=document.createElement('div');moreMenu.className='message-more-menu';
   const more=makeBtn('⋯','আরও অপশন',()=>moreMenu.classList.toggle('open'));moreWrap.appendChild(more);
   const addMore=(label,handler)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>{moreMenu.classList.remove('open');handler()};moreMenu.appendChild(b)};
   addMore('↻ আবার উত্তর চাই',()=>{const last=sessionStorage.getItem('aqr:lastQuestion');if(last){document.getElementById('prompt').value=last;sendQuestion()}});
   addMore('🔊 পড়ে শোনান',()=>speakAiMessage(body.textContent));addMore('⧉ উত্তর কপি করুন',()=>copyAiMessage(body.textContent));addMore('↗ উত্তর শেয়ার করুন',()=>shareAiMessage(body.textContent));addMore('⚑ মতামত/রিপোর্ট',()=>toast('মতামত/রিপোর্ট অপশন প্রস্তুত করা হয়েছে'));
   moreWrap.appendChild(moreMenu);actions.appendChild(moreWrap);el.__actions=actions;el.__body=body;el.appendChild(actions);
 }
 box.appendChild(el);box.scrollTop=box.scrollHeight;return el
}
async function streamAiResponse(body,text){
 const raw=String(text||'');body.innerHTML='';let partial='';
 for(const token of raw.split(/(\s+)/)){
   partial+=token;body.innerHTML=markdownToSafeHtml(partial);
   const cursor=document.createElement('span');cursor.className='ai-stream-cursor';cursor.textContent='▋';body.appendChild(cursor);
   boxScrollForStreaming(body);await new Promise(r=>setTimeout(r,/\s+/.test(token)?28:24));
 }
 body.innerHTML=markdownToSafeHtml(raw);
}
function boxScrollForStreaming(body){const box=document.getElementById('messages');if(box)box.scrollTop=box.scrollHeight}
async function copyAiMessage(text){
 try{await navigator.clipboard.writeText(text);toast('উত্তর কপি হয়েছে')}catch(e){const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();toast('উত্তর কপি হয়েছে')}
}
function speakAiMessage(text){
 if(!('speechSynthesis'in window)){toast('এই ব্রাউজারে পড়ে শোনানোর সুবিধা নেই');return}
 window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='bn-BD';window.speechSynthesis.speak(u)
}
async function shareAiMessage(text){
 if(navigator.share){try{await navigator.share({title:'আল-কুরআন রিসার্চ',text});return}catch(e){if(e?.name==='AbortError')return}}
 await copyAiMessage(text);toast('শেয়ার সুবিধা না থাকায় উত্তরটি কপি করা হয়েছে')
}
function setBusy(busy){document.getElementById('sendBtn').disabled=busy;document.getElementById('sendBtn').textContent=busy?'…':'↑'}
async function sendQuestion(){const prompt=document.getElementById('prompt');const q=prompt.value.trim();if(!q){toast('প্রশ্ন লিখুন বা বলুন');return}sessionStorage.setItem('aqr:lastQuestion',q);document.getElementById('welcome').style.display='none';addMessage(q,'user');const readerJump=parseReaderJump(q);prompt.value='';if(readerJump)openReaderAt(readerJump.sura,readerJump.ayah,readerJump.source);setBusy(true);const pending=addMessage('উত্তর তৈরি হচ্ছে…','ai pending');try{const response=await fetch(CHAT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q+'\\n\\n[UI নির্দেশনা: এই উত্তরের শেষে একটি UI আইকন নির্বাচন করুন এবং শুধু এই ফরম্যাটে দিন: [[AQR_ICON:quran]] বা [[AQR_ICON:ayah]] বা [[AQR_ICON:research]] বা [[AQR_ICON:analysis]] বা [[AQR_ICON:translation]] বা [[AQR_ICON:tafsir]] বা [[AQR_ICON:document]] বা [[AQR_ICON:info]] বা [[AQR_ICON:verified]]. এই ট্যাগটি উত্তরটির শেষে রাখুন; অন্য কোনো আইকন লাইব্রেরি ব্যবহার করবেন না।]',mode:'general'})});let data={};try{data=await response.json()}catch{}if(!response.ok)throw new Error(data.error||'AI সংযোগে সমস্যা হয়েছে।');const rawAnswer=String(data.answer||'AI কোনো উত্তর দেয়নি。');
const iconMatch=rawAnswer.match(/\[\[AQR_ICON:(quran|ayah|research|analysis|translation|tafsir|document|info|verified|success|user|settings|bookmark|reference|warning)\]\]/i);
const selectedIcon=iconMatch?iconMatch[1].toLowerCase():iconNameFromQuestion(q);
const cleanAnswer=rawAnswer.replace(/\[\[AQR_ICON:[^\]]+\]\]/gi,'').trim();
await streamAiResponse(pending.querySelector('.message-body'),cleanAnswer);
renderAiIcon(pending.querySelector('.message-body'),selectedIcon);pending.dataset.icon=selectedIcon;if(data.provider)pending.dataset.provider=data.provider;if(pending.__actions)pending.__actions.hidden=false}catch(error){pending.querySelector('.message-body').textContent='দুঃখিত, AI সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।';if(pending.__actions)pending.__actions.hidden=false;toast(String(error.message||error))}finally{pending.classList.remove('pending');setBusy(false)}}
function loadActionBarDemo(){
 if(location.hash!=='#actionbar-demo')return;
 document.getElementById('welcome').style.display='none';
 const demo=addMessage('এটি AI Action Bar-এর প্রথম ডেমো।\n\nএই উত্তরের নিচে Copy, Like, Dislike, Read Aloud, Share এবং ⋯ More অপশন পরীক্ষা করতে পারবেন।','ai');
 if(demo.__actions)demo.__actions.hidden=false;
}

document.getElementById('sendBtn').onclick=sendQuestion;
const promptBox=document.getElementById('prompt');
function autoResizePrompt(){promptBox.style.height='auto';const max=140;promptBox.style.height=Math.min(promptBox.scrollHeight,max)+'px';promptBox.style.overflowY=promptBox.scrollHeight>max?'auto':'hidden'}
promptBox.addEventListener('input',autoResizePrompt);
promptBox.addEventListener('keydown',e=>{if(e.key==='Escape'){closeComposerTools();return}if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendQuestion()}});
loadActionBarDemo();

const SURA_NAMES=["আল-ফাতিহা","আল-বাকারা","আলে ইমরান","আন-নিসা","আল-মায়িদা","আল-আনআম","আল-আরাফ","আল-আনফাল","আত-তাওবা","ইউনুস","হুদ","ইউসুফ","আর-রাদ","ইবরাহিম","আল-হিজর","আন-নাহল","আল-ইসরা","আল-কাহফ","মারইয়াম","ত্ব-হা","আল-আম্বিয়া","আল-হাজ্জ","আল-মুমিনুন","আন-নূর","আল-ফুরকান","আশ-শুআরা","আন-নামল","আল-কাসাস","আল-আনকাবুত","আর-রূম","লুকমান","আস-সাজদাহ","আল-আহযাব","সাবা","ফাতির","ইয়াসিন","আস-সাফফাত","সাদ","আয-যুমার","গাফির","ফুসসিলাত","আশ-শূরা","আয-যুখরুফ","আদ-দুখান","আল-জাসিয়া","আল-আহকাফ","মুহাম্মাদ","আল-ফাতহ","আল-হুজুরাত","কাফ","আয-যারিয়াত","আত-তূর","আন-নাজম","আল-কামার","আর-রহমান","আল-ওয়াকিয়া","আল-হাদিদ","আল-মুজাদিলা","আল-হাশর","আল-মুমতাহিনা","আস-সাফ","আল-জুমুআ","আল-মুনাফিকুন","আত-তাগাবুন","আত-তালাক","আত-তাহরিম","আল-মুলক","আল-কলম","আল-হাক্কাহ","আল-মাআরিজ","নূহ","আল-জিন্ন","আল-মুযযাম্মিল","আল-মুদ্দাসসির","আল-কিয়ামাহ","আল-ইনসান","আল-মুরসালাত","আন-নাবা","আন-নাযিআত","আবাসা","আত-তাকভীর","আল-ইনফিতার","আল-মুতাফফিফিন","আল-ইনশিকাক","আল-বুরুজ","আত-তারিক","আল-আলা","আল-গাশিয়াহ","আল-ফজর","আল-বালাদ","আশ-শামস","আল-লাইল","আদ-দুহা","আশ-শারহ","আত-তিন","আল-আলাক","আল-কদর","আল-বাইয়্যিনাহ","আয-যিলযাল","আল-আদিয়াত","আল-কারিয়াহ","আত-তাকাসুর","আল-আসর","আল-হুমাযাহ","আল-ফিল","কুরাইশ","আল-মাউন","আল-কাওসার","আল-কাফিরুন","আন-নাসর","আল-মাসাদ","আল-ইখলাস","আল-ফালাক","আন-নাস"];
// Source 1 is the project's language-research edition: a provenance-preserving composite.
// Base Arabic: Tanzil Uthmani v1.1 (verbatim; attribution required).
// Bengali meaning: QuranEnc Abu Bakr Zakaria (provider terms/attribution required).
// Bengali pronunciation: Anis Afifi dataset field transliteration_bn (provenance remains separately recorded).
// Linguistic analysis: Quranic Arabic Corpus v0.4 (GPL; attribution/link required).
const QURAN_API='https://quran-json.risan.workers.dev/text/uthmani/chapters/';
const BENGALI_TRANSLATION_API='https://al-quran-research.mosharrof0000.workers.dev/reader/translation/';
const BENGALI_PRONUNCIATION_API='https://al-quran-research.mosharrof0000.workers.dev/reader/pronunciation';
const DIRECT_BENGALI_TRANSLATION_API='https://quranenc.com/api/v1/translation/sura/bengali_zakaria/';
const DIRECT_BENGALI_PRONUNCIATION_API='https://datasets-server.huggingface.co/rows?dataset=anisafifi%2Fmultilingual-quran&config=default&split=all';
const SURA_AYAH_COUNTS=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
function quranSourceOffset(n){return SURA_AYAH_COUNTS.slice(0,n-1).reduce((a,b)=>a+b,0)}
const reader=document.getElementById('quranReader'),select=document.getElementById('suraSelect'),qtext=document.getElementById('quranText'),qstatus=document.getElementById('quranStatus');
SURA_NAMES.forEach((n,i)=>{const o=document.createElement('option');o.value=i+1;o.textContent=(i+1)+' — '+n;select.appendChild(o)});
function normalizeArabicPayload(payload,n){
  const verses=payload?.surahs?.[0]?.ayahs||payload?.ayahs||payload?.verses||payload?.data?.ayahs||payload?.data?.verses||payload?.data||[];
  if(!Array.isArray(verses))return [];
  return verses.map((v,i)=>({numberInSurah:Number(v.number||v.numberInSurah||v.verse_number||v.aya||i+1),arabic:String(v.text||v.arabic||v.text_ar||'')})).filter(v=>v.numberInSurah>=1&&v.numberInSurah<=SURA_AYAH_COUNTS[n-1]);
}
function normalizeTranslationPayload(payload){
  const rows=Array.isArray(payload)?payload:(payload?.result||payload?.data||payload?.ayahs||[]);
  return Array.isArray(rows)?rows.map(x=>({aya:Number(x.aya||x.verse_number||x.number),translation:String(x.translation||x.text||'')})).filter(x=>x.aya>0):[];
}
function normalizePronunciationPayload(payload,n){
  const rows=Array.isArray(payload?.rows)?payload.rows:[];
  return rows.map(x=>x?.row||x?.data||x||{}).filter(x=>Number(x.chapter_number||x.sura||x.surah||0)===n).map(x=>({verse:Number(x.verse_number||x.aya||x.number||0),text:String(x.transliteration_bn||'')})).filter(x=>x.verse>0&&x.text.trim());
}
async function fetchJsonWithFallback(primaryUrl,fallbackUrl,options={}){
  try{const r=await fetch(primaryUrl,options);if(r.ok)return await r.json()}catch(e){}
  const r=await fetch(fallbackUrl,options);if(!r.ok)throw new Error('Source endpoint unavailable ('+r.status+')');return await r.json();
}
async function loadPronunciation(n){
  const offset=quranSourceOffset(n),total=SURA_AYAH_COUNTS[n-1],parts=[];
  for(let start=0;start<total;start+=100){
    const query='?offset='+(offset+start)+'&length='+Math.min(100,total-start);
    try{
      const p=await fetchJsonWithFallback(BENGALI_PRONUNCIATION_API+query,DIRECT_BENGALI_PRONUNCIATION_API+query,{cache:'no-store'});
      parts.push(...normalizePronunciationPayload(p,n));
    }catch(e){}
  }
  return parts;
}
async function showSura(n,source=activeQuranSource){
  n=Number(n); if(!Number.isInteger(n)||n<1||n>114)return;
  try{
    const sourceLabel=source==='language-quran'?'ভাষাভিত্তিক কুরআন — Source ১':'Tanzil Uthmani — Source ২';
    qstatus.textContent=sourceLabel+' • সূরা '+n+' — '+SURA_NAMES[n-1]+' লোড হচ্ছে…';
    qtext.innerHTML='';
    select.value=String(n);
    const [arabicResponse,bnResponse]=await Promise.all([
      fetch(QURAN_API+n+'.json',{cache:'force-cache'}),
      (async()=>{try{const r=await fetch(BENGALI_TRANSLATION_API+n,{cache:'no-store'});if(r.ok)return r; }catch(e){} return fetch(DIRECT_BENGALI_TRANSLATION_API+n,{cache:'no-store'});})()
    ]);
    if(!arabicResponse.ok)throw new Error('আরবি উৎস থেকে ডেটা পাওয়া যায়নি ('+arabicResponse.status+')');
    if(!bnResponse.ok)throw new Error('বাংলা অনুবাদ উৎস থেকে ডেটা পাওয়া যায়নি ('+bnResponse.status+')');
    const [arabicPayload,bnPayload,pronunciationRows]=await Promise.all([arabicResponse.json(),bnResponse.json(),loadPronunciation(n)]);
    const verses=normalizeArabicPayload(arabicPayload,n);
    const translations=normalizeTranslationPayload(bnPayload);
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
    qstatus.textContent=sourceLabel+' | সূরা '+n+' — '+SURA_NAMES[n-1]+' | '+verses.length+' আয়াত';
    if(translations.length!==verses.length)toast('বাংলা অনুবাদের কিছু আয়াত পাওয়া যায়নি');
    if(pronunciationRows.length!==verses.length)toast('বাংলা উচ্চারণের কিছু আয়াত পাওয়া যায়নি');
    if(pendingReaderJump){
      const target=document.getElementById('ayah-'+pendingReaderJump);
      if(target){target.scrollIntoView({behavior:'smooth',block:'center'});target.setAttribute('data-jump','true');setTimeout(()=>target.removeAttribute('data-jump'),2200)}
      pendingReaderJump=null;
    }
  }catch(e){qstatus.textContent='সমস্যা: '+e.message; qtext.innerHTML='<div class="reader-error">'+e.message+'</div>'}
}
const openReaderBtn=document.getElementById('openReader');
if(openReaderBtn)openReaderBtn.onclick=()=>{reader.classList.add('open');showSura(Number(select.value||1))};
if(location.hash==='#quran')openQuranHome();
window.addEventListener('hashchange',()=>{if(location.hash==='#quran')openQuranHome()});
document.getElementById('closeReader').onclick=()=>reader.classList.remove('open');
select.onchange=()=>showSura(Number(select.value));
document.getElementById('prevSura').onclick=()=>showSura(Math.max(1,Number(select.value)-1));
document.getElementById('nextSura').onclick=()=>showSura(Math.min(114,Number(select.value)+1));

// Smart Chat Composer v1: adaptive input, left tools, focused tool prompts.

/* Chat Font Customizer v1 */
(function(){
 const panel=document.getElementById('fontPanel'), open=document.getElementById('fontBtn'), close=document.getElementById('closeFontPanel');
 const bn=document.getElementById('bnFontSelect'), ar=document.getElementById('arFontSelect'), size=document.getElementById('fontSizeRange'), line=document.getElementById('lineHeightRange');
 const sizeOut=document.getElementById('fontSizeValue'), lineOut=document.getElementById('lineHeightValue'), reset=document.getElementById('fontReset');
 if(!panel||!open)return;
 const bnFonts={system:'system-ui,"Noto Sans Bengali",sans-serif',hind:'"Hind Siliguri",system-ui,sans-serif',meghaloy:'"Hasan Meghaloy","Hind Siliguri",sans-serif',munam:'"Hasan Munam","Hind Siliguri",sans-serif',hera:'"Hasan Hera","Hind Siliguri",sans-serif',mokhmoli:'"Hasan Mokhmoli","Hind Siliguri",sans-serif'};
 const arFonts={default:'"Noto Naskh Arabic","Amiri",serif',alquds:'"Al Quds","Noto Naskh Arabic",serif'};
 function apply(){document.documentElement.style.setProperty('--aqr-chat-bn-font',bnFonts[bn.value]||bnFonts.system);document.documentElement.style.setProperty('--aqr-chat-ar-font',arFonts[ar.value]||arFonts.default);document.documentElement.style.setProperty('--aqr-chat-size',size.value+'px');document.documentElement.style.setProperty('--aqr-chat-line',line.value);sizeOut.textContent=size.value+'px';lineOut.textContent=line.value;localStorage.setItem('aqr-font-settings',JSON.stringify({bn:bn.value,ar:ar.value,size:size.value,line:line.value}));}
 function load(){try{const x=JSON.parse(localStorage.getItem('aqr-font-settings')||'{}');if(x.bn)bn.value=x.bn;if(x.ar)ar.value=x.ar;if(x.size)size.value=x.size;if(x.line)line.value=x.line}catch(e){}apply()}
 open.onclick=()=>{panel.hidden=!panel.hidden}; close.onclick=()=>panel.hidden=true;
 [bn,ar,size,line].forEach(x=>x.addEventListener('input',apply)); reset.onclick=()=>{bn.value='system';ar.value='default';size.value=15;line.value=1.7;apply()}; load();
})();

/* User Profile Avatar System v2 — FileReader preview + LocalStorage persistence. */
const profileAvatarPanel=document.getElementById('profileAvatarPanel');
const profileAvatarInput=document.getElementById('profileAvatarInput');
const profileAvatarPreview=document.getElementById('profileAvatarPreview');
const profileAvatarMain=document.getElementById('profileAvatarMain');
const profileAvatarSelect=document.getElementById('profileAvatarSelect');
const profileAvatarSave=document.getElementById('profileAvatarSave');
const profileAvatarRemove=document.getElementById('profileAvatarRemove');
const closeProfileAvatar=document.getElementById('closeProfileAvatar');
let pendingProfileAvatar=null;

function profileAvatarPlaceholder(){return '<span class="profile-avatar-default">○</span>'}
function renderProfileAvatar(src){
  const render=(target)=>{
    if(!target)return;
    if(src){
      target.innerHTML='';
      const img=document.createElement('img');
      img.src=src;
      img.alt='ব্যবহারকারীর প্রোফাইল ছবি';
      target.appendChild(img);
    }else{
      target.innerHTML=profileAvatarPlaceholder();
    }
  };
  render(profileAvatarMain);
  render(profileAvatarPreview);
}
function openProfileAvatar(){
  profileAvatarPanel.hidden=false;
  profileAvatarSave.disabled=!pendingProfileAvatar;
}
function closeProfileAvatarPanel(){profileAvatarPanel.hidden=true}
function previewProfileAvatar(file){
  if(!file||!file.type.startsWith('image/')){toast('একটি ছবি নির্বাচন করুন');return}
  const reader=new FileReader();
  reader.onload=()=>{pendingProfileAvatar=String(reader.result||'');renderProfileAvatar(pendingProfileAvatar);profileAvatarSave.disabled=!pendingProfileAvatar};
  reader.onerror=()=>toast('ছবিটি পড়া যায়নি');
  reader.readAsDataURL(file);
}
function saveAvatar(){
  if(!pendingProfileAvatar){toast('আগে একটি ছবি নির্বাচন করুন');return}
  try{
    localStorage.setItem('userProfileAvatar',pendingProfileAvatar);
    renderProfileAvatar(pendingProfileAvatar);
    profileAvatarInput.value='';
    pendingProfileAvatar=null;
    profileAvatarSave.disabled=true;
    closeProfileAvatarPanel();
    toast('প্রোফাইল ছবি সংরক্ষণ হয়েছে');
  }catch(e){toast('ছবি সংরক্ষণ করা যায়নি');}
}
function removeAvatar(){
  localStorage.removeItem('userProfileAvatar');
  pendingProfileAvatar=null;
  profileAvatarInput.value='';
  profileAvatarSave.disabled=true;
  renderProfileAvatar(null);
  closeProfileAvatarPanel();
  toast('প্রোফাইল ছবি সরানো হয়েছে');
}
function loadSavedAvatar(){
  const saved=localStorage.getItem('userProfileAvatar');
  renderProfileAvatar(saved||null);
  profileAvatarSave.disabled=true;
}
profileAvatarSelect.onclick=()=>profileAvatarInput.click();
profileAvatarInput.onchange=()=>previewProfileAvatar(profileAvatarInput.files&&profileAvatarInput.files[0]);
profileAvatarSave.onclick=saveAvatar;
profileAvatarRemove.onclick=removeAvatar;
closeProfileAvatar.onclick=closeProfileAvatarPanel;
profileAvatarPanel.addEventListener('click',e=>{if(e.target===profileAvatarPanel)closeProfileAvatarPanel()});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!profileAvatarPanel.hidden)closeProfileAvatarPanel()});
window.addEventListener('load',loadSavedAvatar);
