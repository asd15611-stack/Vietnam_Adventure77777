const CACHE='taiwan-monopoly-v15-harbor-20261117';
const PAGE=new URL('index.html',self.registration.scope).toString();
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.add(PAGE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('taiwan-monopoly-v15-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.mode!=='navigate')return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){let copy=response.clone();caches.open(CACHE).then(c=>c.put(PAGE,copy)).catch(()=>{})}return response}).catch(()=>caches.match(PAGE))) });
