import type { Board, Line, Dot, Diff } from '../../type'
import type { ImcompleteLine } from './type'

import { getDiff, isValidLine } from './getPossibleLines'

const getScore = (board, lines, line) => {
    const issues = {}

    lines.forEach(l => {
        const { white, black } = getDiff(line, l)
        const key = black + '-' + white

        issues[key] = (0 | issues[key]) + 1
    })

    return (
        Object.keys(issues).reduce((sum, key) => {
            const [b, w] = key.split('-')

            const diff = { black: +b, white: +w }

            const newBoard = [...board, { line, diff }]

            const n = lines.filter(l => isValidLine(newBoard, l)).length

            return sum + issues[key] * n
        }, 0) / lines.length
    )
}

const getBestLine_ = (board: Board, lines: Line[]): Line | null =>
    !lines[0]
        ? null
        : lines.reduce((best, line) => {
              const score = getScore(board, lines, line)

              if (!best || best.score > score) return { line, score }

              return best
          }, null).line

export const getBestLine = (board: Board, lines: Line[]): Line | null =>
    board.length === 0 ? [1, 2, 3, 4] : getBestLine_(board, lines)
