import { App as Component } from './index'
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
                board: stateProps.board,
                linePlayed: dispatchProps.linePlayed,
            }

        case 'writeDiff':
            return {
                board: stateProps.board,
                setDiff: dispatchProps.setDiff,
            }

        case 'computing':
            return {
                board: stateProps.board,
                computing: true,
            }

        case 'error':
            return {
                board: stateProps.board,
                error: stateProps.error,
            }

        default:
            return {
                board: stateProps.board,
            }
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    Component
)
