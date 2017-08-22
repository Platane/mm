import type { Board, Line, Dot, Diff } from '../../type'
import type { ImcompleteLine } from './type'

import { getPossibleLines } from './getPossibleLines'
import { getDiff, isValidSolution } from './validSolution'
import { getApproximatedScore } from './getBestLine'

const raf =
    typeof requestAnimationFrame === 'undefined'
        ? () => new Promise(resolve => setTimeout(resolve, 0))
        : () => new Promise(resolve => requestAnimationFrame(resolve))

const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

const chunkify = (n, arr) =>
    Array.from({ length: Math.ceil(arr.length / n) }).map((_, i) =>
        arr.slice(i * n, (i + 1) * n)
    )

export const asyncGetBestLine = async (board: Board): Promise<Line | null> => {
    await raf()

    if (board.length === 0) return [1, 2, 3, 4]

    const possibleLines = getPossibleLines(board)
    const chunks = chunkify(50, possibleLines)

    let bestLine = null
    let bestScore = 9999999

    const acceptable_score =
        possibleLines.length > 60
            ? possibleLines.length * 0.45
            : possibleLines.length

    while (chunks.length) {
        chunks.shift().forEach(line => {
            const score = getApproximatedScore(board, possibleLines, line)

            if (score < bestScore) {
                bestScore = score
                bestLine = line

                if (score < acceptable_score) return
            }
        })

        if (bestScore < acceptable_score) return bestLine

        await raf()
    }

    return bestLine
}
