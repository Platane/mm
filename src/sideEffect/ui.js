import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from '../component/App/connected'

import type { Store } from '../reducer/type'

export const init = (store: Store) => {
    const render = () =>
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('app')
        )

    if (document.getElementById('app')) {
        render()
    } else {
        window.addEventListener('load', render)
    }

    // return the destroy function
    return () => ReactDOM.unmountComponentAtNode(document.getElementById('app'))
}
