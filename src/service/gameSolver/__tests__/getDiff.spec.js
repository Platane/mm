import { getDiff } from '../validSolution'

const samples = [
    [[1, 2, 3, 4], [1, 3, 2, 2], { black: 1, white: 2 }],
    [[1, 2, 3, 4], [2, 2, 2, 2], { black: 1, white: 0 }],
    [[2, 2, 2, 2], [1, 2, 3, 4], { black: 1, white: 0 }],
    [[1, 2, 3, 4], [1], { black: 1, white: 0 }],
    [[1, 2, 3, 4], [1, 3], { black: 1, white: 1 }],
    [[1, 2, 3, 4], [2, 3], { black: 0, white: 2 }],
]

describe('getDiff', () =>
    samples.forEach(([a, b, out]) =>
        // prettier-ignore
        it(`${a.join(' ')} -> ${b.join(' ')} should be black:${out.black} white:${out.white}`, () =>
            expect(getDiff(a, b)).toEqual(out))
    ))
