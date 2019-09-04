self.addEventListener("install", evt => {
  console.log("[ServiceWorker] Install " + new Date());
  self.skipWaiting();
});

self.addEventListener("activate", evt => {
  console.log("[ServiceWorker] Activate " + new Date());
});
