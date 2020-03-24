import { getFeedback } from "../getFeedback";
import { lineToEmoji, feedbackToEmoji } from "../emojis";
import { Line, Feedback } from "../type";

const samples: {
  solution: Line;
  candidate: Line;
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
  it(`should compute feedback for ${lineToEmoji(
    candidate
  )} against ${lineToEmoji(solution)} -> ${feedbackToEmoji(feedback)}`, () => {
    expect(getFeedback(solution, candidate)).toEqual(feedback);
  });
});
