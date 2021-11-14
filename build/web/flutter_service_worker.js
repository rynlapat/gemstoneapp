'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "86a3e4dd7267d962a588a8f2ab8d7d36",
"assets/assets/images/bg.jpg": "80b77ced5c317f93f451b51ee0d12ecb",
"assets/assets/images/bg10.jpg": "8b4390c70f4edc9fe1ebfb9e1d08a48e",
"assets/assets/images/bg2.jpg": "4518db5ce467f4ce95a0721e05e45a69",
"assets/assets/images/bg3.jpg": "d1930541a7f5728eca3e028b999b49bd",
"assets/assets/images/bg4.jpg": "e70be1b993edaf7118983f5d7fa5ec23",
"assets/assets/images/bg5.jpg": "2ee48b1b868af138a68cf63a42672cd6",
"assets/assets/images/bg6.jpg": "538e07691980359e34509942b0258fa8",
"assets/assets/images/bg7.jpg": "d6c43d19fb9edd27f742bc26803b49e2",
"assets/assets/images/bg8.jpg": "2f04e0b9a76e4e498d803b1c0199445d",
"assets/assets/images/bg9.jpg": "2f11ee1433abdc45c4debfd4293dc273",
"assets/assets/images/blue-sapphire.jpg": "703ea12beb6f1b8573f9826074aa9a9b",
"assets/assets/images/blue-sapphire.png": "a09577d4528b87cc35f22592bea3cb4d",
"assets/assets/images/diamond.jpg": "77db4a5abaaf6cb56f5870c6cb272757",
"assets/assets/images/diamond.png": "8f12ab9d3574534d34e2e421a9979361",
"assets/assets/images/emerald.jpg": "871e81a44e8a8933e195ba55b0f54d68",
"assets/assets/images/emerald.png": "dbd7ac126cd834c6a6f4b473fac37970",
"assets/assets/images/pearl.jpg": "e2ea9e9b9ce3db9b4076afd8212f4e14",
"assets/assets/images/pearl.png": "d3b15e6045cd0d0494bf83acd1f86b21",
"assets/assets/images/profile.jpg": "fd105e9fe6608c93b292b79ac6a4dc27",
"assets/assets/images/profile2.jpg": "2d1e4146313894f5d746b42430fe9c0c",
"assets/assets/images/profile3.jpg": "70235089d279951beb252687500b38ae",
"assets/assets/images/profile4.jpg": "bd0d44767c2826026728aca3bc195751",
"assets/assets/images/ruby.jpg": "98505c7b63e07f9614eec09572443a34",
"assets/assets/images/ruby.png": "56fa78ca6fcbae81fb15d019fbab2f99",
"assets/assets/images/yellow-sapphire.jpg": "29929238cf5dc5aa447aa26d01d037ac",
"assets/assets/images/yellow-sapphire.png": "10b9953c9e6cbd35ec4ae7a7604cb0bc",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "1e1232d008a39a1b965c7a238bd622a9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "c9eeec12533df722da95e3aca0ec6b95",
"/": "c9eeec12533df722da95e3aca0ec6b95",
"main.dart.js": "0add4e068186a4d95e921686f322815b",
"manifest.json": "593b9253284c84e8e926d61b0db960aa",
"version.json": "d74e7a0981a31a7efdc11f7fe34fb0d1"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
