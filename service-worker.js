var version = "-v1.1";
var dataCacheName = "pipeline" + version;
var cacheName = "htmlComponents" + version;

var filesToCache = [
  "/index.html",
  "/js/common.js",
  "/js/materialize.min.js",
  "/js/materialize.js",
  "/js/angular-1.0.1.min.js",
  "/js/jquery-3.2.1.min.js",
  "/css/materialize.css",
  "/css/materialize.min.css",
  "/images/cmenezes.jpg",
  "/images/romulo.jpg",
  "/images/fleite.png",
  "/images/lardito.jpg",
  "/images/mmelari.jpg",
  "/images/rcaporali.jpg",
  "/images/artit_bkg.png",
  "/images/clientes.jpg",
  "/images/presales.jpg",
  "/images/oportunidade.jpg",
  "/images/reembolso.jpg",
  "/images/relatorios.jpg",
  "/images/rh.jpg",
  "/images/ico/android-icon-192x192.png"
];

/**
 * Install Event
 */
self.addEventListener("install", function(event) {
  console.log(
    "[ServiceWorker] PIPELINE SW: Instalando PIPELINE Service Worker"
  );
  event.waitUntil(
    caches
      .open(cacheName)
      .then(function(cache) {
        console.log(cache);
        console.log(filesToCache);
        console.log(
          "[ServiceWorker] PIPELINE SW: Criando Cache (" + cacheName + ")"
        );
        return cache
          .addAll(filesToCache)
          .then(function() {
            console.log(
              "[ServiceWorker] PIPELINE SW: Cache criado com sucesso"
            );
          })
          .catch(function(error) {
            console.log(
              "[ServiceWorker] PIPELINE SW: Erro criado cache: " + error
            );
          });
      })
      .catch(function(err) {
        console.log(
          "[ServiceWorker] PIPELINE SW: Erro ao abrir o Cache " +
            cacheName +
            "( " +
            err +
            " )"
        );
      })
  );
});

/**
 * Activate Event
 */
self.addEventListener("activate", function(event) {
  console.log("[ServiceWorker] PIPELINE SW: Ativando serviço");
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

/**
 * Fetch event
 */
self.addEventListener("fetch", function(event) {
  console.log("[ServiceWorker] PIPELINE SW: Fetching ( " + event.request + ")");
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        console.log("[ServiceWorker] PIPELINE SW: Fetching from Cache");
        return response;
      }
      console.log("[ServiceWorker] PIPELINE SW: Fetching from Origin");
      return fetch(event.request);
    })
  );
});
