import { createStore, applyMiddleware, compose } from 'redux'
import { defaultState, reduce } from './reducer'

import { init as initUI } from './sideEffect/ui'
import { init as initServiceWorker } from './sideEffect/serviceWorker'

// import './service/gameTest'

let store
{
    const crashReporter = store => next => action => {
        try {
            return next(action)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('Caught an exception!', err)
            throw err
        }
    }

    // create redux store
    const middlewares = [crashReporter]
    const enhancers = [
        ...('undefined' != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__
            ? [
                  window.__REDUX_DEVTOOLS_EXTENSION__({
                      maxAge: 50,
                      latency: 500,
                  }),
              ]
            : []),
        applyMiddleware(...middlewares),
    ]
    store = createStore(reduce, defaultState, compose(...enhancers))
}

;[initUI, initCompute, initServiceWorker].forEach(init => init(store))
