/* global navigator */

const SW_PATH = require('file-loader?name=sw.js!./sw.js')

const isSupported = () =>
    'undefined' !== typeof navigator &&
    navigator.serviceWorker &&
    'function' === typeof navigator.serviceWorker.register

export const init = () => {
    if (isSupported()) return

    navigator.serviceWorker.register(SW_PATH, { scope: './' }).catch(err =>
        // eslint-disable-next-line no-console
        console.warn('service worker error', err)
    )
}
