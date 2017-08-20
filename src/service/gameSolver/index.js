import type { Board, Line, Dot, Diff } from '../../type'

type ImcompleteLine = Line | [Dot, Dot, Dot] | [Dot, Dot] | [Dot] | []

const dots: Dot[] = [1, 2, 3, 4, 5, 6]

const combine = (k: number): Dot[][] => {
    if (k === 0) return []
    if (k === 1) return dots.map(dot => [dot])

    const previous = combine(k - 1)

    return [].concat(...dots.map(dot => previous.map(l => [dot, ...l])))
}

export const getDiff = (a: Line, b: ImcompleteLine): Diff => {
    const permutation = [-1, -1, -1, -1]

    // black
    b.forEach((dot, i) => {
        if (dot === a[i]) permutation[i] = i
    })

    // white
    b.forEach((dot, i) => {
        if (permutation[i] != -1) return

        const index = a.findIndex(
            (d, index) => d === dot && !permutation.some(u => u === index)
        )

        if (index > -1) permutation[i] = index
    })

    let white = 0
    let black = 0

    permutation.forEach((u, i) => {
        if (u == -1) return

        if (u == i) black++
        else white++
    })

    return {
        black,
        white,
    }
}

const isValidLine = (board: Board, l: ImcompleteLine): boolean =>
    board.every(({ line, diff }) => {
        const { white, black } = getDiff(line, l)

        return diff.white === white && diff.black === black
    })

const reduceDomain = (domain, board) => {}

const ALL = combine(4)

export const getPossibleLines = (board: Board): Line[] =>
    ALL.filter(l => isValidLine(board, l))

///
///
///

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

const getBestLine_ = (board: Board, lines: Line[]): Line =>
    lines.reduce((best, line) => {
        const score = getScore(board, lines, line)

        if (!best || best.score > score) return { line, score }

        return best
    }, null).line

export const getBestLine = (board: Board, lines: Line[]): Line =>
    board.length === 0 ? [1, 2, 3, 4] : getBestLine_(board, lines)
