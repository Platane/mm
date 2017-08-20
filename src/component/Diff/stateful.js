import React from 'react'
import { Diff as SimpleDiff } from './index'
import type { Diff as Diff_type } from '../../type'

export type Props = { diff: Diff_type, setDiff: (diff: Diff_type) => void }

const diffToDots = diff =>
    [
        ...Array.from({ length: diff.black }, () => 'black'),
        ...Array.from({ length: diff.white }, () => 'white'),
        ...Array.from({ length: 4 }, () => null),
    ].slice(0, 4)

const dotsToDiff = dots => ({
    black: dots.filter(x => x === 'black').length,
    white: dots.filter(x => x === 'white').length,
})

export class Diff extends React.Component {
    state = { dots: [null, null, null, null] }

    constructor(props: Props) {
        super(props)

        this.state = {
            dots: diffToDots(this.props.diff),
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        const diff = dotsToDiff(this.state.dots)

        // if (
        //     diff.black != nextProps.diff.black ||
        //     diff.white != nextProps.diff.white
        // )
        //     this.setState({ dots: diffToDots(this.props.diff) })
    }

    setDots = dots => {
        if (!this.props.setDiff) return

        this.setState({ dots })

        this.props.setDiff(dotsToDiff(dots))
    }

    render() {
        return (
            <SimpleDiff
                {...this.props}
                dots={this.state.dots}
                setDots={this.setDots}
            />
        )
    }
}
