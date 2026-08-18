/ Nombre del caché para esta versión del juego
const CACHE_NAME = 'esquiva-juego-v1';

// Archivos que se guardarán en la memoria del dispositivo para uso sin conexión
const urlsToCache = [
  './',
  './index.html', // Asegúrate de que tu archivo HTML principal se llame así
  './icono.png',
  './logofirma.png',
  './manifest.json'
];

// Evento de instalación: Se ejecuta la primera vez que el usuario abre la app
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento fetch: Intercepta las peticiones de red
// Busca primero en el caché, si no está, lo busca en internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo desde el caché si existe, si no, hace la petición a la red
        return response || fetch(event.request);
      })
  );
});