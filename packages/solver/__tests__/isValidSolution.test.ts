import { lineToEmoji, feedbackToEmoji } from "../emojis";
import { isValidSolutionForRow } from "../isValidSolution";

const samples = [
  {
    row: {
      line: [1, 1, 1, 1],
      feedback: { correct: 4, badPosition: 0 },
    },
    candidate: [1, 1, 1, 1],
    valid: true,
  },
  {
    row: {
      line: [1, 2, 2, 1],
      feedback: { correct: 0, badPosition: 3 },
    },
    candidate: [2, 1, 3, 2],
    valid: true,
  },
  {
    row: {
      line: [1, 2, 2, 1],
      feedback: { correct: 1, badPosition: 2 },
    },
    candidate: [2, 1, 2, 4],
    valid: true,
  },
  {
    row: {
      line: [1, 2, 2, 1],
      feedback: { correct: 1, badPosition: 2 },
    },
    candidate: [2, 1, 2, 1],
    valid: false,
  },
  {
    row: {
      line: [1, 2, 2, 1],
      feedback: { correct: 0, badPosition: 0 },
    },
    candidate: [4, 1, 3, 3],
    valid: false,
  },
];

samples.forEach(({ row, candidate, valid }: any) => {
  it(`should validate ${lineToEmoji(candidate)} against ${lineToEmoji(
    row.line
  )} ${feedbackToEmoji(row.feedback)}  ->  ${valid ? "✅" : "❎"}`, () => {
    expect(isValidSolutionForRow(row, candidate)).toBe(valid);
  });
});
