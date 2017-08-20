import type { Board, Line, Diff } from '../type'

export type State = {
    board: Board,

    lineToPlay: Line,

    linePossible: Line[],
}
