// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'pipeline-v1';
var cacheName = 'ArtITPipeline-v1';
var filesToCache = [
  '/',
  'index.html',
  'js/common.js',
  'css/materialize.css',
  'css/materialize.min.css',
  'images/cmenezes.jpg',
  'images/romulo.jpg',
  'images/fleite.png',
  'images/lardito.jpg',
  'images/mmelari.jpg',
  'images/artit_bkg.png',
  'images/clientes.jpg',
  'images/presales.jpg',
  'images/oportunidade.jpg',
  'images/reembolso.jpg',
  'images/relatorios.jpg',
  'images/rh.jpg',
  'images/ico/android-icon-192x192.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] PIPELINE SW: Instalando PIPELINE Service Worker');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] PIPELINE SW: Criando Cache');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log('[ServiceWorker] PIPELINE SW: Erro ao Criar Cache ( ' + err + ' )');
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});
