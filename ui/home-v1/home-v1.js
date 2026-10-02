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
