export type Peg = 1 | 2 | 3 | 4 | 5 | 6;

export type Line = [Peg, Peg, Peg, Peg];

export type Feedback = {
  correct: number;
  badPosition: number;
};

export type Row = { line: Line; feedback: Feedback };
