import { getScore } from "./getScore";
import { Line } from "./type";

export const getBestLine = (possibleLines: Line[]): Line | null => {
  let bestScore = Infinity;
  let best = null;

  for (const candidate of possibleLines) {
    const score = getScore(possibleLines, candidate);

    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  return best;
};
