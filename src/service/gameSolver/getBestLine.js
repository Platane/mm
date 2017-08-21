import type { Board, Line, Dot, Diff } from '../../type'
import type { ImcompleteLine } from './type'

import { getDiff, isValidSolution } from './validSolution'

export const getScore = (board: Board, possibleLines: Line[], line: Line) => {
    const issues = {}

    possibleLines.forEach(l => {
        const { white, black } = getDiff(line, l)
        const key = black + '-' + white

        issues[key] = (0 | issues[key]) + 1
    })

    return (
        Object.keys(issues).reduce((sum, key) => {
            const [b, w] = key.split('-')

            const diff = { black: +b, white: +w }

            const newBoard = [...board, { line, diff }]

            const n = possibleLines.filter(l => isValidSolution(newBoard, l))
                .length

            return sum + issues[key] * n
        }, 0) / possibleLines.length
    )
}

export const getApproximatedScore = (
    board: Board,
    possibleLines: Line[],
    line: Line
) => {
    const issues = {}

    // list all the issue possible, and their occurence
    possibleLines.forEach(l => {
        const { white, black } = getDiff(line, l)
        const key = black + '-' + white

        issues[key] = (0 | issues[key]) + 1
    })

    // keep only the most reprensentative issues
    const sortedKeys = Object.keys(issues).sort(
        (a, b) => (issues[a] < issues[b] ? 1 : -1)
    )
    const elagatedKeys = []
    let n = 0
    while (n < possibleLines.length * 0.7) {
        const key = sortedKeys.shift()

        elagatedKeys.push(key)

        n += issues[key]
    }

    // for this issues, determine how many will be left once played,
    // take the average
    const newBoard = [...board, { line, diff: { black: 0, white: 0 } }]
    return (
        elagatedKeys.reduce((sum, key) => {
            const [b, w] = key.split('-')

            newBoard[newBoard.length - 1].diff.black = +b
            newBoard[newBoard.length - 1].diff.white = +w

            const n = possibleLines.filter(l => isValidSolution(newBoard, l))
                .length

            return sum + issues[key] * n
        }, 0) / n
    )
}

const getBestLine_ = (board: Board, lines: Line[]): Line | null =>
    !lines[0]
        ? null
        : lines.reduce((best, line) => {
              const score = getApproximatedScore(board, lines, line)

              if (!best || best.score > score) return { line, score }

              return best
          }, null).line

export const getBestLine = (board: Board, lines: Line[]): Line | null =>
    board.length === 0 ? [1, 2, 3, 4] : getBestLine_(board, lines)
