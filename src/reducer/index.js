import type { State } from './type'

export const defaultState: State = {
    state: 'computing',

    board: [],
}

export const reduce = (state: State, action): State => {
    switch (action.type) {
        case 'setDiff': {
            if (state.state != 'writeDiff') return state

            const board = state.board.map(
                (x, i, arr) =>
                    i === arr.length - 1 ? { ...x, diff: action.diff } : x
            )
            return {
                board,
                state: 'computing',
            }
        }

        case 'linePlayed': {
            if (state.state != 'playThis') return state

            return {
                board: state.board,
                linePossible: state.linePossible,
                state: 'writeDiff',
            }
        }

        case 'computing:done': {
            if (state.state != 'computing') return state

            const board = [
                ...state.board,
                { line: action.bestLine, diff: { white: 0, black: 0 } },
            ]

            return {
                state: 'playThis',
                board,
                linePossible: action.possibleLines,
            }
        }

        case 'computing:start':
        default:
            return state
    }
}
