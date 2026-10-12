const C='carnet-v4',A=['./','./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png','https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.allSettled(A.map(u=>c.add(u)))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=e.request.url;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put('./index.html',c));return r}).catch(()=>caches.match('./index.html')));return}
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(/tile\.openstreetmap|unpkg|fonts\.g/.test(u)||u.startsWith(self.location.origin)){const cl=res.clone();caches.open(C).then(c=>c.put(e.request,cl))}return res})))});
