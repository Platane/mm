const assets = ['index.html', 'app_original_file.js', 'style_original_file.css']

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
                cacheKeys.map(
                    key => !whiteList.includes(key) && caches.delete(key)
                )
            )
        })
    )
})
