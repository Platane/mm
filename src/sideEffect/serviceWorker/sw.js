const assets = [
    '.',
    './',
    'index.html',
    'app_original_file.js',
    'style_original_file.css',
]

const assetCacheKey = assets.join('-')

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(assetCacheKey).then(cache => cache.addAll(assets))
    )
})

self.addEventListener('activate', event => {
    const whiteList = [assetCacheKey]

    event.waitUntil(
        // get the currently cached files, remove the one that are out of date
        caches.keys().then(cacheKeys => {
            Promise.all(
                cacheKeys
                    .filter(key => !whiteList.includes(key))
                    .map(key => caches.delete(key))
            )
        })
    )
})

const isSuffix = (suffix, word) => word.slice(-suffix.length) === suffix

self.addEventListener('fetch', event => {
    // consider all the things as cached
    // expect sw.js and manifest.json

    const requestURL = new URL(event.request.url)

    if (
        isSuffix('/sw.js', requestURL.pathname) ||
        isSuffix('/manifest.json', requestURL.pathname)
    )
        return

    event.respondWith(caches.match(event.request))
})
