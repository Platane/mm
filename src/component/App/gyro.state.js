import React from 'react'
import { create, isSupported } from '../../service/deviceOrientation'

export const wrap = C => {
    class Stateful extends React.Component {
        state = { gamma: 0, alpha: 0, beta: 0 }

        getOrientation = create()

        _timeout = null

        loop = () => {
            this.setState(this.getOrientation())

            cancelAnimationFrame(this._timeout)
            this._timeout = requestAnimationFrame(this.loop)
        }

        componentDidMount() {
            this.loop()
        }

        componentWillUnmount() {
            cancelAnimationFrame(this._timeout)
        }

        render() {
            return <C {...this.props} {...this.state} />
        }
    }
    return Stateful
}
