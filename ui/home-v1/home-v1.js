/* AQR home-v1 loader — loads known-good core then applies scroll fix */
(function () {
  var CORE = 'https://cdn.jsdelivr.net/gh/mosharrof0000-ux/al-quran-research@272a7d0d285d5942ca83ccd0a1751bc7a2921d7e/ui/home-v1/home-v1.js';
  function patch(code) {
    code = code.replace(
      /if\(type\.includes\('user'\)\)\{\s*const targetTop=Math\.max\(0,el\.offsetTop-78\);\s*box\.scrollTop=targetTop;\s*\}else\{\s*box\.scrollTop=box\.scrollHeight;\s*\}\s*return el\s*\}/,
      "if(box){box.classList.add('has-messages');var nearBottom=box.scrollHeight-box.scrollTop-box.clientHeight<120;if(type.includes('user')||nearBottom||type.includes('pending')){requestAnimationFrame(function(){box.scrollTop=box.scrollHeight;});}return el}"
    );
    code = code.replace(
      /function boxScrollForStreaming\(body\)\{const box=document\.getElementById\('messages'\);if\(box\)box\.scrollTop=box\.scrollHeight\}/,
      "function boxScrollForStreaming(body){var box=document.getElementById('messages');if(!box)return;var nearBottom=box.scrollHeight-box.scrollTop-box.clientHeight<160;if(nearBottom)box.scrollTop=box.scrollHeight;}"
    );

    code = code.replace(
      /const b=document\.createElement\('button'\);b\.type='button';b\.textContent='খুলুন';\s*b\.onclick=\(\)=>\{selectedPrivateSource=s\.source_id;privateUnlock\.hidden=false;privatePin\.focus\(\);privateStatus\.textContent='এই Source-এর server-side PIN দিন।'\};/,
      "const b=document.createElement('button');b.type='button';b.textContent=s.installed?'খুলুন':'ইনস্টল বাকি';b.disabled=!s.installed;b.onclick=()=>{if(!s.installed){privateStatus.textContent='এই Private Source এখনো ইনস্টল হয়নি; অনুমতি ও উৎস যাচাই বাকি।';return}selectedPrivateSource=s.source_id;privateUnlock.hidden=false;privatePin.focus();privateStatus.textContent='এই Source-এর server-side PIN দিন।'};"
    );
    code = code.replace(
      /toast\('Private Source খোলা হয়েছে'\);\s*privateStatus\.textContent='Access granted — গবেষণা context সক্রিয়।';\s*privateUnlock\.hidden=true;privatePin\.value='';/,
      "if(!data.access_token||data.token_type!=='Bearer'||Number(data.expires_in_seconds)!==900){toast('Private Research session যাচাই হয়নি।');privateStatus.textContent='Session তৈরি হয়নি; Chat context নিষ্ক্রিয়।';return}toast('Private Research session তৈরি হয়েছে');privateStatus.textContent='Session চালু; Private Source-এর Chat retrieval এখনো সংযুক্ত নয়।';privateUnlock.hidden=true;privatePin.value='';"
    );
    return code;
  }
  fetch(CORE, { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('core ' + r.status); return r.text(); })
    .then(function (code) {
      var s = document.createElement('script');
      s.textContent = patch(code);
      document.head.appendChild(s);
      console.log('[AQR] home-v1 core loaded with bidirectional scroll fix');
    })
    .catch(function (e) {
      console.error('[AQR] failed to load home-v1 core', e);
    });
})();
