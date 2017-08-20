import React from 'react'
import { Diff as SimpleDiff } from './index'
import type { Diff as Diff_type } from '../../type'

export type Props = { diff: Diff_type }

export class Diff extends React.Component {
    state = { dots: [null, null, null, null] }

    constructor(props: Props) {
        super(props)

        this.state = {
            dots: [
                ...Array.from({ length: this.props.diff.black }, () => 'black'),
                ...Array.from({ length: this.props.diff.white }, () => 'white'),
                ...Array.from({ length: 4 }, () => null),
            ].slice(0, 4),
        }
    }

    componentWillReceiveProps(nextProps: Props) {}

    setDots = dots => {
        this.setState({ dots })
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
