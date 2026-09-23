const CACHE_NAME='aqr-pwa-v1';
const APP_SHELL=[
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.svg',
  './pwa-icon-192.png',
  './pwa-icon-512.png',
  './ui/home-v1/home-v1.html',
  './ui/home-v1/home-v1.css',
  './ui/home-v1/home-v1.js',
  './ui/home-v1/gemini-icon-v1.css',
  './ui/auth/drawer-v1.css',
  './ui/auth/drawer-v1.js',
  './assets/icon-engine/aqr-icon-engine.js'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;
  event.respondWith(
    fetch(req).then(res=>{
      const copy=res.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));
      return res;
    }).catch(()=>caches.match(req).then(cached=>cached||caches.match('./index.html')))
  );
});