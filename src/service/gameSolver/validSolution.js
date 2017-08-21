import type { Board, Line, Dot, Diff } from '../../type'
import type { ImcompleteLine } from './type'

export const getDiff = (a: Line, b: ImcompleteLine): Diff => {
    const permutation = [-1, -1, -1, -1]

    // black
    b.forEach((dot, i) => {
        if (dot === a[i]) permutation[i] = i
    })

    // white
    b.forEach((dot, i) => {
        if (permutation[i] != -1) return

        permutation[i] = a.findIndex(
            (d, index) => d === dot && !permutation.some(u => u === index)
        )
    })

    const black = permutation.reduce((s, index, i) => s + (index === i), 0)
    const white =
        permutation.reduce((s, index) => s + (index !== -1), 0) - black

    return {
        black,
        white,
    }
}

export const isValidSolutionForRow = (
    line: Line,
    diff: Diff,
    l: ImcompleteLine
): boolean => {
    const { white, black } = getDiff(line, l)

    const dblack = diff.black - black
    const dwhite = diff.white - white

    return (
        // should not have more black than the target
        dblack >= 0 &&
        // should not have more black than the target
        // /!\ some white can be changed to black by completing l
        dwhite + Math.min(dblack, 4 - l.length) >= 0 &&
        // enougth free space to add the missing black and white
        dblack + dwhite <= 4 - l.length
    )
}

export const isValidSolution = (board: Board, l: ImcompleteLine): boolean =>
    board.every(({ line, diff }) => isValidSolutionForRow(line, diff, l))
