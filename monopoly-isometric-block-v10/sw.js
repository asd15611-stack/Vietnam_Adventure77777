const CACHE='taiwan-isometric-block-v1.0a';
const HOME=new URL('index.html',self.registration.scope).toString();
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.add(HOME)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('taiwan-isometric-block-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.mode!=='navigate')return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(HOME,copy)).catch(()=>{})}return response}).catch(()=>caches.match(HOME)))});
