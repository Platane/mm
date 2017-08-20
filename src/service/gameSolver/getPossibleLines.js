import type { Board, Line, Dot, Diff } from '../../type'
import type { ImcompleteLine } from './type'

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

export const isValidLine = (board: Board, l: ImcompleteLine): boolean =>
    board.every(({ line, diff }) => {
        const { white, black } = getDiff(line, l)

        return diff.white === white && diff.black === black
    })

const ALL_LINES = combine(4)

export const getPossibleLines = (board: Board): Line[] =>
    ALL_LINES.filter(l => isValidLine(board, l))
