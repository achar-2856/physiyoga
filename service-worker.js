const CACHE_NAME = 'physiyoga-v4';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './about.html',
    './services.html',
    './blog.html',
    './testimonials.html',
    './contact.html',
    './styles.css',
    './modal.css',
    './carousel.css',
    './script.js',
    './manifest.json',
    './images/logo_icon.png'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // Force the waiting service worker to become active immediately
});

// Activate Event (Cleanup old caches)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event (Network-First with Cache Fallback)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // If a valid response is returned, clone and cache it
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // If offline or network fails, fallback to cache
                return caches.match(event.request);
            })
    );
});
