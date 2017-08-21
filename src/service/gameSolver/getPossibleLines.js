import type { Board, Line, Dot, Diff } from '../../type'
import type { ImcompleteLine } from './type'

import {
    getDiff,
    isValidSolutionForRow,
    isValidSolution,
} from './validSolution'

const dots: Dot[] = [1, 2, 3, 4, 5, 6]

const combine = (k: number): Dot[][] => {
    if (k === 0) return []
    if (k === 1) return dots.map(dot => [dot])

    const previous = combine(k - 1)

    return [].concat(...dots.map(dot => previous.map(l => [dot, ...l])))
}

const ALL_LINES = combine(4)

export const _getPossibleLines = (board: Board): Line[] =>
    ALL_LINES.filter(l => isValidSolution(board, l))

const branch = (board: Board, u: ImcompleteLine): Line[] =>
    u.length === 4
        ? [u.slice()]
        : [].concat(
              ...dots.map(dot => {
                  u.push(dot)

                  const res = isValidSolution(board, u) ? branch(board, u) : []

                  u.pop()

                  return res
              })
          )

export const getPossibleLines = (board: Board): Line[] => branch(board, [])
