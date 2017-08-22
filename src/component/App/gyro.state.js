import React from 'react'
import { create, isSupported } from '../../service/deviceOrientation'

export const wrap = C => {
    class Stateful extends React.Component {
        state = { gamma: 0 }

        getOrientation = create()

        _timeout = null

        loop = () => {
            this.setState({ gamma: this.getOrientation().gamma })

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
            return <C {...this.props} gamma={this.state.gamma} />
        }
    }
    return Stateful
}
