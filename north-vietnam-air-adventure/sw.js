const CACHE = 'north-vietnam-air-games-v3.2.1-20261117';
const OFFLINE = ['./index.html','./manifest.webmanifest','../icon-192.png','../icon-512.png','./icon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c=>c.addAll(OFFLINE)).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('north-vietnam-air-games-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e => {
 const req=e.request; if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin) return;
 if(req.mode==='navigate'){e.respondWith(fetch(req).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put('./index.html',copy)));} return r;}).catch(()=>caches.match('./index.html')));return;}
 e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)));}return r;})));
});
