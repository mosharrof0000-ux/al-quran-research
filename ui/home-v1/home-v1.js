/* AQR home-v1 loader — prefer the same-origin core; use CDN only as a fallback. */
(function () {
  'use strict';
  var currentScript = document.currentScript;
  var localCore = currentScript && currentScript.src
    ? new URL('./home-v1-core.js', currentScript.src).href
    : 'home-v1-core.js';
  var remoteCore = 'https://cdn.jsdelivr.net/gh/mosharrof0000-ux/al-quran-research@272a7d0d285d5942ca83ccd0a1751bc7a2921d7e/ui/home-v1/home-v1.js';

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

  function fetchText(url) {
    return fetch(url, { cache: 'no-store' }).then(function (response) {
      if (!response.ok) throw new Error('core ' + response.status + ' from ' + url);
      return response.text();
    });
  }

  function inject(code, source) {
    var script = document.createElement('script');
    script.textContent = patch(code);
    script.dataset.aqrCoreSource = source;
    document.head.appendChild(script);
    console.info('[AQR] home-v1 core loaded from ' + source);
  }

  fetchText(localCore)
    .then(function (code) {
      inject(code, 'same-origin');
    })
    .catch(function (localError) {
      console.warn('[AQR] local core unavailable; trying CDN fallback', localError);
      return fetchText(remoteCore).then(function (code) {
        inject(code, 'CDN fallback');
      });
    })
    .catch(function (error) {
      console.error('[AQR] failed to load home-v1 core', error);
      var notice = document.createElement('div');
      notice.setAttribute('role', 'alert');
      notice.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;padding:12px 14px;border-radius:12px;background:#7f1d1d;color:#fff;font:14px system-ui,sans-serif;box-shadow:0 4px 18px #0005';
      notice.textContent = 'অ্যাপের মূল স্ক্রিপ্ট লোড হয়নি। ইন্টারনেট সংযোগ পরীক্ষা করে পৃষ্ঠা আবার খুলুন।';
      document.body.appendChild(notice);
    });
})();
