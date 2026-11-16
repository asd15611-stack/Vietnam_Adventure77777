const CACHE='taiwan-map-v03-audit';const HOME=new URL('index.html',self.registration.scope).toString();
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.add(HOME)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('taiwan-map-v03-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.mode!=='navigate')return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){let cp=response.clone();caches.open(CACHE).then(c=>c.put(HOME,cp)).catch(()=>{})}return response}).catch(()=>caches.match(HOME)))});
