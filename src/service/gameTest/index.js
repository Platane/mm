import { getPossibleLines, getBestLine, getDiff } from '../gameSolver'

import type { Line, Board, Dot } from '../../type'

const randomDot = (): Dot => Math.floor(Math.random() * 6) + 1

const generateLine: Line = () => Array.from({ length: 4 }, randomDot)

const play = () => {
    const solution: Line = generateLine()

    const board: Board = []

    let k = 0
    let win = false

    while (k < 10 && !win) {
        const line = getBestLine(board, getPossibleLines(board))
        const diff = getDiff(solution, line)

        board.push({ line, diff })

        k++

        if (diff.black === 4) win = true
    }

    return { win, k, solution }
}

const start = Date.now()

const games = Array.from({ length: 5 }, play)

const end = Date.now()

const n_win = games.filter(x => x.win).length
const average_k = games.filter(x => x.win).reduce((s, x) => s + x.k, 0) / n_win

console.log(`
    ${games.length} games
    ${n_win} win
    ${average_k} turn
    in ${end - start}ms (${(end - start) / games.length}ms / game)
`)
