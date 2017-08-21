/* global caches self URL fetch */

const assets = ['index.html', 'app.js', 'style.css']

const assetCacheKey = 'staticAsset'

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(assetCacheKey).then(cache => cache.addAll(assets))
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        // get the currently cached files, remove the one that are out of date
        caches.keys().then(cacheKeys => {
            Promise.all(cacheKeys.map(key => caches.delete(key)))
        })
    )
})
