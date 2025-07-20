const CACHE_NAME = 'race-v1';
const urlToCache = [
    "./",
    "./css/bootstrap.min.css",
    "./css/style.css",
    "./vendor/jquery.min.js",
    "./vendor/bootstrap.bundle.min.js",
    "./vendor/sweetalert2.all.min.js",
    "./js/components/score.js",
    "./js/components/line-start.js",
    "./js/components/line-finish.js",
    "./js/main.js",
    "./index.js",
    "./img/car/kamu.png",
    "./img/car/alex.png",
    "./img/car/dono.png",
    "./img/car/tejo.png",
    "./img/car/jepri.png",
    "./img/info/kamu_info.png",
    "./img/info/alex_info.png",
    "./img/info/dono_info.png",
    "./img/info/tejo_info.png",
    "./img/info/jepri_info.png",

];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cachesName) {
            return Promise.all(
                cachesName.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});