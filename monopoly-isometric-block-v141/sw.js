const CACHE='taiwan-monopoly-v141-occlusion-1';
const HOME=new URL('index.html',self.registration.scope).toString();
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.add(HOME)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(x=>x.startsWith('taiwan-monopoly-v141-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.mode!=='navigate')return;event.respondWith(fetch(event.request).then(res=>{if(res.ok){const clone=res.clone();caches.open(CACHE).then(c=>c.put(HOME,clone)).catch(()=>{})}return res}).catch(()=>caches.match(HOME)))});
