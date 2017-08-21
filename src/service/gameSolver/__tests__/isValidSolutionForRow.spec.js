import { isValidSolutionForRow } from '../validSolution'

const samples = [
    [[1, 2, 3, 4], { black: 1, white: 2 }, [1, 3, 2, 2], true],
    [[1, 2, 3, 4], { black: 2, white: 2 }, [1, 3, 2, 2], false],

    [[1, 2, 3, 4], { black: 1, white: 0 }, [1], true],
    [[1, 2, 3, 4], { black: 1, white: 2 }, [1], true],
    [[1, 2, 3, 4], { black: 2, white: 2 }, [1], true],
    [[1, 2, 3, 4], { black: 0, white: 2 }, [1], false],
    [[1, 2, 3, 4], { black: 2, white: 3 }, [1], false],
    [[1, 2, 3, 4], { black: 2, white: 2 }, [4, 3], true],

    [[1, 2, 3, 4], { black: 1, white: 2 }, [5, 6], false],

    [[1, 2, 3, 4], { black: 1, white: 1 }, [2, 3], true],
    [[1, 2, 3, 4], { black: 1, white: 1 }, [2, 3, 3], true],

    [[1, 2, 3, 4], { black: 1, white: 1 }, [6, 6, 4, 3], false],
    [[1, 2, 3, 4], { black: 1, white: 1 }, [4, 1, 1, 1], false],
]

describe('isValidSolutionForRow', () =>
    samples.forEach(([a, diff, b, out]) =>
        // prettier-ignore
        it(`${a.join(' ')}, black:${diff.black} white:${diff.white} -> ${b.join(' ')} should be ${out ? 'valid' : 'invalid'}`, () =>
            expect(isValidSolutionForRow(a,diff, b)).toEqual(out))
    ))
