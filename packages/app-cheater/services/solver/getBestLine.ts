// @ts-ignore
import Worker from "workerize-loader!./getBestLine-worker";
import { Line } from "@mm/solver/type";

const workers = Array.from(
  { length: window.navigator.hardwareConcurrency - 1 },
  () => new Worker()
);

const batch = <T>(arr: T[], length = 1) => {
  const u = Math.ceil(arr.length / length);
  return Array.from({ length }).map((_, i) => arr.slice(i * u, (i + 1) * u));
};

export const getBestLine = async (
  possibleLines: Line[]
): Promise<Line | null> => {
  const lineGroups = batch(possibleLines, workers.length);

  const resultByGroup = await Promise.all(
    lineGroups.map((lines, i) => workers[i].getBestLine(possibleLines, lines))
  );

  let best = null;
  let bestScore = Infinity;

  for (const { score, line } of resultByGroup) {
    if (score < bestScore) {
      bestScore = score;
      best = line;
    }
  }

  return best;
};