[back](README.md)

# Lab: Learn about Service Worker its Live Cycle

A service worker is a special kind of web worker. It is event driven and always
registered against a certain path. Its main purpose is to intercept network
requests to improve performance and support offline experiences.

## Basic Setup

Create an `index.html` that registers a service worker for the root path:

```
<html>
  <body>
    <h1>ServiceWorker</h1>
  </body>
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((reg) => {
            console.log('Service worker registered.');
          });
      });
    }
  </script>
</html>
```

Now let the `service-worker.js` subscribe to the two live cycle events:

```
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
})
```

Serve the application (in the same directory as the `index.html` file):

```
npx live-server .
```

and open the chrome development tools. In the console you should see that the
service-worker installed correctly and that both the `install` and the `active`
event have fired once.

When we reload the page, we still see that the worker was registered sucessfully
but the installation and activation events are missing

## Updates to Service worker

Now modify the service worker, for example by adding current Date information to
the log statements

```
  self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install ' + new Date());
  });

  self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate ' + new Date());
  })

```

In the `Application` Tag you can now see, that there is a new Service worker
available. The `install` event even fired but the worker has not been actived
yet. This will occur only when the current worker terminates after we close the
browser tab. The same can be achieved by clicking `skip Waiting` or by calling
`self.skipWaiting` in the `install` handler.

## Facility Service worker development

By skipping the waiting Phase we ensure that we always run the latest version of
the service worker.

```
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install ' + new Date());
  self.skipWaiting();
});
```

If we want to ensure, that the `install` and `activation` events run on every
page reload, we still have to check the `Update on reload` flag in the
DevTools `Application` tab.
