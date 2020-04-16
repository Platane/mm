// @ts-ignore
import Worker from "workerize-loader!./getBestLine-worker";
import { Line } from "@mm/solver/type";

const n = Math.max(
  1,
  Math.floor((+window.navigator.hardwareConcurrency / 3) * 2)
);

const workers = Array.from({ length: n }, () => new Worker());

export const getBestLine = async (
  possibleLines: Line[]
): Promise<Line | null> => {
  const reasonnablePossibleLines = possibleLines.slice(0, 800);
  const lineGroups = batch(reasonnablePossibleLines, workers.length);

  const resultByGroup = await Promise.all(
    lineGroups.map((lines, i) =>
      workers[i].getBestLine(reasonnablePossibleLines, lines)
    )
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

const batch = <T>(arr: T[], length = 1) => {
  const u = Math.ceil(arr.length / length);
  return Array.from({ length }).map((_, i) => arr.slice(i * u, (i + 1) * u));
};

// export const getBestLine = ([l]: Line[]) => Promise.resolve(l);
