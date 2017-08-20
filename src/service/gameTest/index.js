import { getPossibleLines, getBestLine, getDiff } from '../gameSolver'

const randomDot = () => Math.floor(Math.random() * 6) + 1

const generateLine = () => Array.from({ length: 4 }, randomDot)

const play = () => {
    const solution = generateLine()

    const board = []

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

const games = Array.from({ length: 200 }, play)

const n_win = games.filter(x => x.win).length
const average_k = games.filter(x => x.win).reduce((s, x) => s + x.k, 0) / n_win

console.log(`
    ${games.length} games
    ${n_win} win
    ${average_k} turn
`)
