import type { Board, Line, Diff } from '../type'

export type State =
    | {
          state: 'playThis',

          board: Board,
          linePossible: Line[],
      }
    | {
          state: 'computing',

          board: Board,
      }
    | {
          state: 'writeDiff',

          board: Board,
          linePossible: Line[],
      }
