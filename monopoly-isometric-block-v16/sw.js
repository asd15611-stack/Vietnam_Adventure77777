const CACHE='taiwan-monopoly-v16-special-20261117';
const HOME=new URL('index.html',self.registration.scope).toString();
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.add(HOME)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(name=>name.startsWith('taiwan-monopoly-v16-')&&name!==CACHE).map(name=>caches.delete(name)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.mode!=='navigate')return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){let copy=response.clone();caches.open(CACHE).then(cache=>cache.put(HOME,copy)).catch(()=>{})}return response}).catch(()=>caches.match(HOME)))});
