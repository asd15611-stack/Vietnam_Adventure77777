const CACHE='north-monopoly-v1.6';const KEY=new URL('index.html',self.registration.scope).toString();
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.add(KEY)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('north-monopoly-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.mode!=='navigate')return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(KEY,copy)).catch(()=>{})}return response}).catch(()=>caches.match(KEY)))});
