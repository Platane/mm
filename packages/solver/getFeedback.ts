import type { ImcompleteLine, Line, Feedback } from "./type";

export const getFeedback = (
  solution: Line,
  candidate: ImcompleteLine
): Feedback => {
  const permutation = [-1, -1, -1, -1];

  // correct
  solution.forEach((dot, i) => {
    if (dot === candidate[i]) permutation[i] = i;
  });

  // bad position
  solution.forEach((dot, i) => {
    if (permutation[i] != -1) return;

    permutation[i] = candidate.findIndex(
      (d, index) => d === dot && !permutation.some((u) => u === index)
    );
  });

  const correct = permutation.reduce((s, index, i) => s + +(index === i), 0);
  const badPosition =
    permutation.reduce((s, index) => s + +(index !== -1), 0) - correct;

  return { correct, badPosition };
};
