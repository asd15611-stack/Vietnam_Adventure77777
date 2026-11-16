const CACHE='tw-monopoly-v13-20261116';
const HOME=new URL('index.html',self.registration.scope).toString();
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.add(HOME)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(x=>x.startsWith('tw-monopoly-v13-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.mode!=='navigate')return;event.respondWith(fetch(event.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(HOME,copy)).catch(()=>{})}return res}).catch(()=>caches.match(HOME)))});
