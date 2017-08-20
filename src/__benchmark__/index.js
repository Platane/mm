import { getPossibleLines, getBestLine, getDiff } from '../service/gameSolver'
import { create as createRandom } from './random'

import type { Line, Board, Dot } from '../type'

const random = createRandom()

// console.log(
//     Array.from({ length: 1000000 }, random)
//         .map(x => Math.floor(x * 10))
//         .reduce((histo, x) => {
//             histo[x] = (0 | histo[x]) + 1
//             return histo
//         }, [])
// )

const randomDot = (): Dot => Math.floor(random() * 6) + 1

const generateLine: Line = () => Array.from({ length: 4 }, randomDot)

const play = () => {
    const solution: Line = generateLine()

    const board: Board = []

    const start = Date.now()

    let k = 0
    let win = false

    while (k < 10 && !win) {
        const line = getBestLine(board, getPossibleLines(board))
        const diff = getDiff(solution, line)

        board.push({ line, diff })

        k++

        if (diff.black === 4) win = true
    }

    return { win, k, solution, duration: Date.now() - start }
}

const mean = arr => arr.reduce((s, x) => s + x, 0) / arr.length

const q = (a, b, arr) =>
    mean(
        arr
            .slice()
            .sort((a, b) => (a > b ? 1 : -1))
            .slice(Math.floor(arr.length * a), Math.ceil(arr.length * b))
    )

const n = +(process.argv[2] || 5)

const games = Array.from({ length: n }, play)

const win_games = games.filter(x => x.win)
const average_k = mean(win_games.map(x => x.k))
const q95_k = q(0.9, 1, win_games.map(x => x.k))

const average_duration = mean(win_games.map(x => x.duration))
const q95_duration = q(0.9, 1, win_games.map(x => x.duration))

console.log(`
    ${games.length} games
    ${win_games.length} win

    turn :
    average ${average_k} turn
    5% worst ${q95_k} turn

    duration :
    average ${average_duration} ms
    5% worst ${q95_duration} ms
`)
