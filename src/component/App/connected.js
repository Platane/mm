import { App as Component } from './index'
import { wrap as wrapSubmitDiff } from './submitDiff.state'
import { wrap as wrapGyro } from './gyro.state'
import { connect } from 'react-redux'
import { setDiff, linePlayed } from '../../action'

import type { State } from '../../reducer/type'

const mapStateToProps = (state: State) => state

const mapDispatchToProps = {
    setDiff,
    linePlayed,
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    switch (stateProps.state) {
        case 'playThis':
            return {
                board: stateProps.board.map(
                    (x, i, arr) => (i === arr.length - 1 ? { line: x.line } : x)
                ),
                state: stateProps.state,

                linePlayed: dispatchProps.linePlayed,
            }

        case 'writeDiff':
            return {
                board: stateProps.board,
                state: stateProps.state,

                setDiff: dispatchProps.setDiff,
            }

        case 'error':
            return {
                board: stateProps.board,
                state: stateProps.state,

                error: stateProps.error,
            }

        case 'computing':
        default:
            return {
                state: stateProps.state,
                board: stateProps.board,
            }
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    wrapSubmitDiff(wrapGyro(Component))
)
