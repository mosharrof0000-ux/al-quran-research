/* আল-কুরআন গবেষণা — চ্যাট সিস্টেম v2
   নিরাপত্তা: API key এখানে রাখা হবে না।
   Cloudflare Worker endpoint সংযুক্ত করা হয়েছে।
*/
(function(){
  'use strict';
  window.AL_QURAN_CHAT_API = 'https://al-quran-research.mosharrof0000.workers.dev/';
  const modes=[['general','💬 সাধারণ প্রশ্ন'],['word','🔎 শব্দ গবেষণা'],['ayah','🧩 আয়াত বিশ্লেষণ'],['math','📊 গাণিতিক গবেষণা'],['concordance','🔗 একই শব্দ অনুসন্ধান'],['translation','📝 অনুবাদ গবেষণা']];
  let mode='general', speaker=true, recognition=null, listening=false;

  function addStyles(){
    if(document.getElementById('aq-chat-v2-style'))return;
    const s=document.createElement('style'); s.id='aq-chat-v2-style'; s.textContent=`
      .aq-modebar{display:flex;gap:7px;overflow:auto;padding:8px 15px 2px;background:#f0eee9;scrollbar-width:none}
      .aq-modebar::-webkit-scrollbar{display:none}
      .aq-mode{white-space:nowrap;border:1px solid #d2cbbc;background:#fff;border-radius:18px;padding:8px 11px;font:inherit;font-size:12px}
      .aq-mode.active{background:#0d5548;color:#fff;border-color:#0d5548}
      .aq-tools{display:flex;gap:6px;align-items:center}
      .aq-tool{width:43px;height:43px;border:1px solid #c9c4b8;background:#fff;border-radius:12px;font-size:19px;flex:none}
      .aq-tool.active{background:#e8e0c8}
      .aq-status{font-size:11px;color:#6a645c;text-align:center;padding:4px 12px}
      .chat .composer{position:fixed!important;left:50%!important;transform:translateX(-50%)!important;bottom:78px!important;z-index:100001!important;width:min(720px,calc(100% - 28px))!important;display:flex!important;visibility:visible!important;opacity:1!important}
      .chat .composer input{display:block!important;visibility:visible!important;opacity:1!important;min-width:0!important;height:48px!important}
      .chat{padding-bottom:165px!important}
      .aq-thinking-btn{width:100%;min-height:92px;border:1px solid #d9b75d;border-radius:21px;display:flex;align-items:center;gap:17px;padding:15px 17px;background:linear-gradient(135deg,#513a78,#2b2046);color:#fff;cursor:pointer;text-align:left;text-decoration:none;box-shadow:inset 0 1px #fff2,0 12px 30px #0005;transition:.2s;font:inherit}
      .aq-thinking-btn:active{transform:scale(.985)}
      .aq-thinking-btn .aq-ti{font-size:48px;filter:drop-shadow(0 5px 5px #0007)}
      .aq-thinking-btn .aq-thinking-text b{font-size:25px;display:block}
      .aq-thinking-btn .aq-thinking-text span{color:#ddd8d0;font-size:14px}
      .aq-thinking-btn .aq-thinking-arrow{margin-left:auto;font-size:36px;color:#e8d58e}
    `; document.head.appendChild(s);
  }
  function getChat(){return document.querySelector('.chat')}
  function openChat(){const chat=document.getElementById('chat');if(!chat)return false;const active=document.querySelector('.screen.active');if(active&&active.id!=='chat')window.__aqPreviousScreen=active.id;document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));chat.classList.add('active');setup();const input=document.getElementById('aq-input');if(input)setTimeout(()=>input.focus(),100);try{window.scrollTo({top:0,behavior:'smooth'})}catch(e){window.scrollTo(0,0)}return true}
  function closeChat(){const target=window.__aqPreviousScreen||'home';const screen=document.getElementById(target),chat=document.getElementById('chat');if(chat)chat.classList.remove('active');if(screen)screen.classList.add('active')}
  function bindChatOpenButtons(){document.querySelectorAll('.bottom button, #floatingAI').forEach(btn=>{const label=((btn.textContent||'')+' '+(btn.getAttribute('aria-label')||'')+' '+(btn.getAttribute('title')||'')).toLowerCase();if(label.includes('ai সহকারী')&&btn.dataset.aqChatBound!=='1'){btn.dataset.aqChatBound='1';btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openChat()},true)}})}
  function addThinkingButton(){
    addStyles();
    if(document.getElementById('aq-thinking-btn'))return true;
    const home=document.getElementById('home');
    if(!home)return false;
    const actions=home.querySelector('.home-actions');
    if(!actions)return false;
    const a=document.createElement('a');
    a.id='aq-thinking-btn';
    a.className='aq-thinking-btn';
    a.href='our-thinking.html';
    a.innerHTML='<span class="aq-ti">💡</span><span class="aq-thinking-text"><b>আমাদের চিন্তা</b><span>গবেষণার ভাবনা ও ভবিষ্যৎ পরিকল্পনা</span></span><span class="aq-thinking-arrow">›</span>';
    actions.appendChild(a);
    return true;
  }
  function ensureComposer(chat){let composer=chat.querySelector('.composer');if(!composer){composer=document.createElement('div');composer.className='composer';composer.innerHTML='<input type="text" placeholder="বাংলায় প্রশ্ন লিখুন..."><button class="send" type="button">➤</button>';chat.appendChild(composer)}return composer}
  function setup(){addStyles();bindChatOpenButtons();addThinkingButton();const chat=getChat();if(!chat)return false;const body=chat.querySelector('.chat-body');if(!body)return false;if(!document.getElementById('aq-modebar')){const bar=document.createElement('div');bar.id='aq-modebar';bar.className='aq-modebar';modes.forEach(([id,label])=>{const b=document.createElement('button');b.className='aq-mode'+(id===mode?' active':'');b.dataset.mode=id;b.textContent=label;b.onclick=()=>{mode=id;bar.querySelectorAll('.aq-mode').forEach(x=>x.classList.toggle('active',x.dataset.mode===mode));addAI('মোড পরিবর্তন হয়েছে: '+label+'। এখন আপনার প্রশ্ন বলুন বা লিখুন।',false)};bar.appendChild(b)});body.parentNode.insertBefore(bar,body)}
    const composer=ensureComposer(chat);if(!document.getElementById('aq-mic')){const tools=document.createElement('div');tools.className='aq-tools';const mic=document.createElement('button');mic.id='aq-mic';mic.className='aq-tool';mic.title='বাংলায় কথা বলুন';mic.textContent='🎤';mic.onclick=startVoice;const sp=document.createElement('button');sp.id='aq-speaker';sp.className='aq-tool active';sp.title='উত্তর শুনুন';sp.textContent='🔊';sp.onclick=()=>{speaker=!speaker;sp.classList.toggle('active',speaker);sp.textContent=speaker?'🔊':'🔇'};tools.append(mic,sp);composer.insertBefore(tools,composer.firstChild);const input=composer.querySelector('input'),send=composer.querySelector('.send');if(input){input.id='aq-input';input.placeholder='বাংলায় প্রশ্ন লিখুন...';input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();sendMessage()}})}if(send){send.id='aq-send';send.onclick=e=>{e.preventDefault();sendMessage()}}const st=document.createElement('div');st.id='aq-status';st.className='aq-status';st.textContent='বাংলা ভয়েস ও AI চ্যাট প্রস্তুত';composer.parentNode.insertBefore(st,composer)}return true}
  function addUser(t){const body=getChat()?.querySelector('.chat-body');if(!body)return;const d=document.createElement('div');d.className='bubble user-msg';d.textContent=t;body.appendChild(d)}
  function addAI(t,speak=true){const body=getChat()?.querySelector('.chat-body');if(!body)return;const row=document.createElement('div');row.className='ai-row';const b=document.createElement('div');b.className='bubble ai-msg';b.textContent=t;row.appendChild(b);body.appendChild(row);if(speak&&speaker)say(t)}
  function say(t){if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='bn-BD';u.rate=.92;u.pitch=1;window.speechSynthesis.speak(u)}
  function startVoice(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){addAI('আপনার ব্রাউজারে বাংলা ভয়েস ইনপুট সুবিধা নেই। Chrome-এ চেষ্টা করুন।',false);return}if(listening){recognition?.stop();return}recognition=new SR();recognition.lang='bn-BD';recognition.interimResults=false;recognition.maxAlternatives=1;listening=true;const st=document.getElementById('aq-status'),mic=document.getElementById('aq-mic');if(st)st.textContent='🎙️ শুনছি… বাংলায় বলুন';if(mic)mic.textContent='⏹️';recognition.onresult=e=>{const text=e.results[0][0].transcript;const input=document.getElementById('aq-input');if(input){input.value=text;sendMessage()}};recognition.onerror=()=>addAI('ভয়েস শুনতে সমস্যা হয়েছে। আবার 🎤 চাপুন।',false);recognition.onend=()=>{listening=false;if(st)st.textContent='বাংলা ভয়েস ও AI চ্যাট প্রস্তুত';if(mic)mic.textContent='🎤'};recognition.start()}
  async function sendMessage(){const input=document.getElementById('aq-input');if(!input)return;const text=input.value.trim();if(!text)return;input.value='';addUser(text);const endpoint=window.AL_QURAN_CHAT_API;if(!endpoint){addAI('আপনার প্রশ্ন পেয়েছি। AI উত্তর দেওয়ার Worker সংযোগটি এখনো নির্ধারিত হয়নি।',false);return}try{const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,mode,language:'bn'})});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data?.detail||data?.error||`Worker HTTP ${r.status}`);if(!data.answer)throw new Error('Worker থেকে উত্তর আসেনি।');addAI(data.answer)}catch(e){console.error(e);addAI('AI সংযোগে সমস্যা হয়েছে।\nকারণ: '+String(e?.message||e),false)}}
  function watch(){addStyles();bindChatOpenButtons();addThinkingButton();setTimeout(()=>{if(!document.getElementById('aq-thinking-btn'))watch()},500)}
  window.AlQuranChat={setup,sendMessage,startVoice,say,openChat,closeChat};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{watch();setup()});else{watch();setup()}
})();
