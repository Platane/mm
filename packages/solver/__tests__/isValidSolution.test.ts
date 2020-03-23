import { toEmoji, feedbackToEmoji } from "../emojis";
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
      line: [1, 1, 1, 1],
      feedback: { correct: 4, badPosition: 0 },
    },
    candidate: [],
    valid: true,
  },
  {
    row: {
      line: [1, 1, 1, 1],
      feedback: { correct: 4, badPosition: 0 },
    },
    candidate: [1],
    valid: true,
  },
  {
    row: {
      line: [1, 1, 1, 1],
      feedback: { correct: 4, badPosition: 0 },
    },
    candidate: [2],
    valid: false,
  },
  {
    row: {
      line: [1, 1, 1, 1],
      feedback: { correct: 3, badPosition: 0 },
    },
    candidate: [2],
    valid: true,
  },
  {
    row: {
      line: [1, 1, 1, 1],
      feedback: { correct: 3, badPosition: 0 },
    },
    candidate: [2, 2],
    valid: false,
  },
  {
    row: {
      line: [1, 2, 3, 4],
      feedback: { correct: 0, badPosition: 2 },
    },
    candidate: [2, 3, 5],
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
];

samples.forEach(({ row, candidate, valid }: any) => {
  it(`should validate ${toEmoji(candidate)} against ${toEmoji(
    row.line
  )} ${feedbackToEmoji(row.feedback)}`, () => {
    expect(isValidSolutionForRow(row, candidate)).toBe(valid);
  });
});
