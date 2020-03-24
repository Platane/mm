export type Peg = number;

export type Line = Peg[];

export type Feedback = {
  correct: number;
  badPosition: number;
};

export type Row = { line: Line; feedback: Feedback };
