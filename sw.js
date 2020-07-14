const precacheVersion = 2;
const precacheName = 'precache-v' + precacheVersion;
const precacheFiles = [
  "https://cdn.staticaly.com/gh/Seo90/underman/df866c97/virm.png",
  "https://cdn.staticaly.com/gh/Seo90/underman/df866c97/virm.webp",
  "https://www.seotechman.com",
  "/offline/"
];

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Installed');
  self.skipWaiting();

  e.waitUntil(
    caches.open(precacheName).then((cache) => {
      console.log('[ServiceWorker] Precaching files');
      return cache.addAll(precacheFiles);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activated');

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((thisCacheName) => {

        if (thisCacheName.includes("precache") && thisCacheName !== precacheName) {
          console.log('[ServiceWorker] Removing cached files from old cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }

      }));
    })
  );
});

self.addEventListener('fetch', (e) => {

  const requestURL = new URL(e.request.url);
  if (!e.request.referrer.includes(requestURL.hostname)) {
    return e.respondWith(fetch(e.request));
  }

  e.respondWith(
    caches.match(e.request)
      .then((response) => {

        if (response) {
          console.log("[ServiceWorker] Found in cache", e.request.url);
          return response;
        }

        return fetch(e.request)
          .then((fetchResponse) => fetchResponse)
          .catch((err) => {
            
            const isHTMLPage = e.request.method === "GET" && e.request.headers.get("accept").includes("text/html");
            if (isHTMLPage) return caches.match("/offline/");
          });

    })
  );
});
