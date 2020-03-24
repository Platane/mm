import { Line } from "@mm/solver/type";
import { getScore } from "@mm/solver/getScore";

export const getBestLine = (possibleLines: Line[], lineToTests: Line[]) => {
  let bestScore = Infinity;
  let best = null;

  for (const candidate of lineToTests) {
    const score = getScore(possibleLines, candidate);

    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  return { line: best, score: bestScore };
};
