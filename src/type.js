export type Dot = 1 | 2 | 3 | 4 | 5 | 6

export type Line = [Dot, Dot, Dot, Dot]

export type Diff = {
    black: number,
    white: number,
}

export type Board = { line: Line, diff: Diff }[]
