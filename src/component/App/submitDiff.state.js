import React from 'react'

export const wrap = C => {
    class Stateful extends React.Component {
        state = { black: 0, white: 0 }

        submitDiff = () => {
            this.props.setDiff(this.state)
        }

        setDiff = diff => {
            const black = Math.min(Math.max(diff.black, 0), 4)
            const white = Math.min(Math.max(diff.white, 0), 4 - black)

            this.setState({ black, white })
        }

        render() {
            return (
                <C
                    {...this.props}
                    diff={this.state}
                    setDiff={this.props.setDiff && this.setDiff}
                    submitDiff={this.props.setDiff && this.submitDiff}
                />
            )
        }
    }
    return Stateful
}
