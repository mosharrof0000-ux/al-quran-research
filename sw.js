const CACHE_NAME='aqr-pwa-v4';
const BASE='/al-quran-research/';
const APP_SHELL=[
  BASE,BASE+'index.html',BASE+'manifest.webmanifest',BASE+'favicon.svg',
  BASE+'pwa-icon-192.png',BASE+'pwa-icon-512.png',
  BASE+'ui/home-v1/home-v1.html',BASE+'ui/home-v1/home-v1.css',BASE+'ui/home-v1/home-v1.js',
  BASE+'ui/home-v1/gemini-icon-v1.css',BASE+'ui/auth/drawer-v1.css',BASE+'ui/auth/drawer-v1.js',
  BASE+'assets/icon-engine/aqr-icon-engine.js'
];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE_NAME);
 await Promise.all(APP_SHELL.map(async path=>{try{await cache.add(path)}catch(_){}}));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil(
 caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==self.location.origin)return;
 event.respondWith(fetch(req).then(res=>{
   if(res&&res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));}
   return res;
 }).catch(()=>caches.match(req).then(c=>c||caches.match(BASE+'index.html'))));
});