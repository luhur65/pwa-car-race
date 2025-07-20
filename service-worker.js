const CACHE_NAME = 'car-race-v2';
const urlsToCache = [
  './',
  './index.html',
  './src/main.js',
  './src/style.css',
  './manifest.json',
  './icon.png',
  './img/car/kamu.png',
  './img/car/alex.png',
  './img/car/dono.png',
  './img/car/tejo.png',
  './img/car/jepri.png',
  './img/info/kamu_info.png',
  './img/info/alex_info.png',
  './img/info/dono_info.png',
  './img/info/tejo_info.png',
  './img/info/jepri_info.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('🔧 ServiceWorker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ ServiceWorker installed successfully');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('🚀 ServiceWorker activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ ServiceWorker activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('📋 Serving from cache:', event.request.url);
          return response;
        }

        console.log('🌐 Fetching from network:', event.request.url);
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Fallback for offline scenarios
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});

// Background sync for future features
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    // Handle background sync tasks here
  }
});

// Push notifications for future features
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    console.log('📱 Push notification received:', data);
    
    const options = {
      body: data.body,
      icon: './icon.png',
      badge: './icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});