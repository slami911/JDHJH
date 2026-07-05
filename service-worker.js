/* ===================================================================
   Finova — Service Worker v2.0 (Enterprise)
   Cache-First Strategy with Version Management
   =================================================================== */
const CACHE = 'finova-v2';
const ASSETS = [
  '/JDHJH/Personal%20Salary%20Manager.html',
  '/JDHJH/manifest.json',
  '/JDHJH/F.png',
  '/JDHJH/icons/icon-192.svg',
  '/JDHJH/icons/icon-512.svg',
  '/JDHJH/icons/icon-48.png',
  '/JDHJH/icons/icon-72.png',
  '/JDHJH/icons/icon-96.png',
  '/JDHJH/icons/icon-128.png',
  '/JDHJH/icons/icon-144.png',
  '/JDHJH/icons/icon-152.png',
  '/JDHJH/icons/icon-180.png',
  '/JDHJH/icons/icon-192.png',
  '/JDHJH/icons/icon-256.png',
  '/JDHJH/icons/icon-384.png',
  '/JDHJH/icons/icon-512.png'
];

// Cache all icons dynamically using wildcard pattern
const ICON_PATTERN = /\/JDHJH\/icons\/icon-\d+\.(png|svg)$/;

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(ASSETS).catch(err => {
        console.warn('SW: Some assets failed to cache', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => {
          console.log('SW: Clearing old cache', k);
          return caches.delete(k);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  if (e.request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // API calls: Network First
  if (url.hostname.includes('firebase') || url.hostname.includes('googleapis')) {
    e.respondWith(
      fetch(e.request).then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Fonts & CDN: Cache First with stale-while-revalidate for fonts
  if (url.hostname.includes('fonts.googleapis') || 
      url.hostname.includes('fonts.gstatic.com') ||
      url.hostname.includes('cdnjs.cloudflare') ||
      url.hostname.includes('cdn.jsdelivr.net')) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        const fetchPromise = fetch(e.request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // App shell: Cache First with network update
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// Background Sync for offline data
self.addEventListener('sync', (e) => {
  if (e.tag === 'sync-expenses') {
    e.waitUntil(syncExpenses());
  }
});

async function syncExpenses() {
  try {
    const clients = await self.clients.matchAll();
    clients.forEach((client) => client.postMessage({ type: 'SYNC_EXPENSES' }));
  } catch(e) {
    console.warn('SW: Sync failed', e);
  }
}

// Push Notifications
self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : {};
  const options = {
    title: data.title || 'Finova',
    body: data.body || '',
    icon: '/JDHJH/icons/icon-192.png',
    badge: '/JDHJH/icons/icon-96.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  e.waitUntil(self.registration.showNotification(options.title, options));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  if (e.action === 'dismiss') return;
  const url = e.notification.data?.url || '/JDHJH/Personal%20Salary%20Manager.html';
  e.waitUntil(clients.openWindow(url));
});
