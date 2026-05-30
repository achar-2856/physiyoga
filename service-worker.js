const CACHE_NAME = 'physiyoga-v1';
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
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found, else fetch from network
            return response || fetch(event.request);
        })
    );
});
