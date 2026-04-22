// Service worker — full offline PWA support.
// Caches the app shell (HTML, JS, CSS) + images for complete offline use.

const CACHE_NAME = "bichinhos-v2";
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

// Install: pre-cache the navigation shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add("/"))
  );
  self.skipWaiting();
});

// Activate: clean old caches, claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

function isNavigationRequest(request) {
  return request.mode === "navigate";
}

function isStaticAsset(url) {
  return /\.(js|css|woff2?|ttf|otf|png|jpe?g|gif|webp|svg|avif|ico|json|mp3|ogg|wav)(\?|$)/i.test(
    url.pathname
  );
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin GET requests
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;

  // Skip Google Analytics and other third-party scripts
  if (url.hostname !== self.location.hostname) return;

  // Navigation requests (HTML): network-first, fall back to cached shell
  if (isNavigationRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match("/").then((r) => r || new Response("Offline", { status: 503 })))
    );
    return;
  }

  // Static assets (JS, CSS, images, fonts, audio): cache-first with network fallback
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) {
          // Background refresh for JS/CSS (stale-while-revalidate)
          if (/\.(js|css)(\?|$)/i.test(url.pathname)) {
            fetch(event.request).then((res) => {
              if (res.ok) cache.put(event.request, res);
            }).catch(() => {});
          }
          return cached;
        }
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          return new Response("", { status: 503 });
        }
      })
    );
    return;
  }
});
