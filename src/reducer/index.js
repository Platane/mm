import { getPossibleLines, getBestLine } from '../service/gameSolver'

import type { State } from './type'

export const defaultState: State = {
    board: [],

    lineToPlay: [1, 2, 3, 4],

    linePossible: getPossibleLines([]),
}

export const reduce = (state: State, action): State => {
    switch (action.type) {
        case 'setDiff':
            const board = [
                ...state.board,
                { line: state.lineToPlay, diff: action.diff },
            ]

            const linePossible = getPossibleLines(board)

            const lineToPlay = getBestLine(board, linePossible)

            return {
                board,
                linePossible,
                lineToPlay,
            }

        default:
            return state
    }
}
