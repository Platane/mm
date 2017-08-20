import React from 'react'
import { LineToPlay as SimpleLineToPlay } from './index'

export class LineToPlay extends React.Component {
    state = { black: 0, white: 0 }

    submitDiff = () => {
        this.props.setDiff(this.state)
        // this.setState({})
    }

    setDiff = diff => {
        const black = Math.min(Math.max(diff.black, 0), 4)
        const white = Math.min(Math.max(diff.white, 0), 4 - black)

        this.setState({ black, white })
    }

    render() {
        return (
            <SimpleLineToPlay
                {...this.props}
                diff={this.state}
                setDiff={this.setDiff}
                submitDiff={this.submitDiff}
            />
        )
    }
}
