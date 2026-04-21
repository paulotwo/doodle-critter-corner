// Service worker — PWA install prompt + image caching (cache-first, 1d TTL).
const CACHE_NAME = "bichinhos-assets-v1";
const MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function isImageRequest(url) {
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(url.pathname);
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only cache-first for same-origin image assets
  if (event.request.method !== "GET" || url.origin !== self.location.origin || !isImageRequest(url)) {
    return; // let browser handle normally
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      if (cached) {
        const cachedTime = cached.headers.get("sw-cached-at");
        if (cachedTime && Date.now() - Number(cachedTime) < MAX_AGE_MS) {
          return cached;
        }
      }
      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse.ok) {
          // Clone and store with timestamp header
          const body = await networkResponse.arrayBuffer();
          const headers = new Headers(networkResponse.headers);
          headers.set("sw-cached-at", String(Date.now()));
          const cachedResp = new Response(body, {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers,
          });
          cache.put(event.request, cachedResp);
          return new Response(body, {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers: networkResponse.headers,
          });
        }
        return networkResponse;
      } catch (err) {
        if (cached) return cached; // serve stale if offline
        throw err;
      }
    }),
  );
});
