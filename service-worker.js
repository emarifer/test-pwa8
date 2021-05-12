importScripts("/test-pwa8/precache-manifest.1e97aa197315f56b6d9873556e5a8274.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.setCacheNameDetails({ prefix: "test-pwa8" });

workbox.routing.registerRoute(
  new RegExp("https://jsonplaceholder.typicode.com/users"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cache-users'
  })
);

const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});
workbox.routing.registerRoute(
  new RegExp('https://emarinfer-notes.herokuapp.com/users/signup'),
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

/**
 * https://smithgeek.com/pwa-caching-with-workbox-and-cloudflare/
 * https://programmerclick.com/article/76121571311/
 * https://livebook.manning.com/book/progressive-web-apps/chapter-3/53
 */
