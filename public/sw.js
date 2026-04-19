// Minimal service worker — required for PWA install prompt (beforeinstallprompt).
// Network-first, no caching, so preview/production always serve fresh content.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Pass-through: just let the browser handle the request normally.
  // The SW exists only to satisfy PWA installability criteria.
  return;
});
