import { getFeedback } from "../getFeedback";
import { toEmoji, feedbackToEmoji } from "../emojis";
import { Line, ImcompleteLine, Feedback } from "../type";

const samples: {
  solution: Line;
  candidate: ImcompleteLine;
  feedback: Feedback;
}[] = [
  {
    solution: [1, 1, 1, 1],
    candidate: [1, 1, 1, 1],
    feedback: { correct: 4, badPosition: 0 },
  },
  {
    solution: [1, 2, 3, 4],
    candidate: [1, 2, 3, 4],
    feedback: { correct: 4, badPosition: 0 },
  },
  {
    solution: [1, 2, 3, 4],
    candidate: [],
    feedback: { correct: 0, badPosition: 0 },
  },
  {
    solution: [1, 2, 3, 4],
    candidate: [1, 2],
    feedback: { correct: 2, badPosition: 0 },
  },
  {
    solution: [1, 2, 3, 4],
    candidate: [1, 2, 5, 5],
    feedback: { correct: 2, badPosition: 0 },
  },
  {
    solution: [1, 2, 3, 4],
    candidate: [1, 2, 5, 3],
    feedback: { correct: 2, badPosition: 1 },
  },
  {
    solution: [1, 2, 3, 4],
    candidate: [3, 1, 4, 2],
    feedback: { correct: 0, badPosition: 4 },
  },
];

samples.forEach(({ solution, candidate, feedback }) => {
  it(`should compute feedback for ${toEmoji(candidate)} against ${toEmoji(
    solution
  )} -> ${feedbackToEmoji(feedback)}`, () => {
    expect(getFeedback(solution, candidate)).toEqual(feedback);
  });
});
