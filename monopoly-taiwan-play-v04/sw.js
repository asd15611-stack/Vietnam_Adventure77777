const CACHE='taiwan-monopoly-play-v04';const HOME=new URL('index.html',self.registration.scope).toString();
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.add(HOME)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('taiwan-monopoly-play-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.mode!=='navigate')return;e.respondWith(fetch(e.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(HOME,copy)).catch(()=>{})}return res}).catch(()=>caches.match(HOME)))});
