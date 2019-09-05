# Tech Workshop 2019 –– Progressive Web Apps

## Learning Goals

- How to use Lighthouse and Dev Tools
- How to provide metadata (manifest.json)
- Understand the Service Worker Lifecycle
- Know the various caching strategies (network-first, cache-first etc.)
- What are the PWA performance wins? (time-to-first-paint, time-to-interactive)
- Learn about PWA patterns (App Shell, [PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/))

## Agenda

- Introduction
- [Lab: Use a Web Worker](01-web-worker.md)
- [Lab: Learn about Service Worker and its Life Cycle](02-service-worker.md)
- Google Codelab: [Your First Progressive Web App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/)
- Google Codelab: [Build a PWA using Workbox](https://codelabs.developers.google.com/codelabs/workbox-lab/)
- Further topics

## Further Topics

These are ideas for more topics to self-study:

- Implement caching using Service Worker for your own project
- [Add a Service Worker to a Angular CLI project](https://angular.io/guide/service-worker-intro)
- [Add a Service Worker to a Rails project](https://github.com/rossta/serviceworker-rails)
- Learn about more [Workbox](https://developers.google.com/web/tools/workbox/guides/get-started) features
- Checkout the [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) or the [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- Learn about [Background Sync](https://developers.google.com/web/tools/workbox/modules/workbox-background-sync)

## Questions

- How to update the Service Worker?
- What are the Service Worker pitfalls?

## Resources

- ["Progressive Web Apps", Google Developers documentation](https://developers.google.com/web/progressive-web-apps/)
- ["Progressive Web Apps: Escaping Tabs Without Losing Our Soul", article by Alex Russell](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)
- ["The App Shell Model", article by Addy Osmani](https://developers.google.com/web/fundamentals/architecture/app-shell)
- ["The PRPL Pattern", article by Addy Osmani](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
- ["The Service Worker cookbook", by Mozilla, contains a lot of interesting Service Worker recipies](https://serviceworke.rs/) (notice the light gray links to the source code examples in the upper left corner)
- ["ServiceWorkers Outbreak: index-sw-9a4c43b4b47781ca619eaaf5ac1db.js", entertaining talk by Alexander Pope outlining the risks of using Service Workers](https://www.youtube.com/watch?v=CPP9ew4Co0M)
