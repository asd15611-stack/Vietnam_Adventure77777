const CACHE='taiwan-monopoly-v14-char-v1';
const HOME=new URL('index.html',self.registration.scope).toString();
self.addEventListener('install',ev=>ev.waitUntil(caches.open(CACHE).then(c=>c.add(HOME)).then(()=>self.skipWaiting())));
self.addEventListener('activate',ev=>ev.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('taiwan-monopoly-v14-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',ev=>{if(ev.request.mode!=='navigate')return;ev.respondWith(fetch(ev.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(HOME,cp)).catch(()=>{})}return res}).catch(()=>caches.match(HOME))) });
