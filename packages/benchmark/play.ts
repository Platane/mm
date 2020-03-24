import { getBestLine } from "@mm/solver/getBestLine";
import { getFeedback } from "@mm/solver/getFeedback";
import { isValidSolutionForRow } from "@mm/solver/isValidSolution";
import { Line } from "@mm/solver/type";
import { createRandom } from "@mm/utils/createRand";
import { getBestDefaultLine } from "@mm/solver/getBestDefaultLine";
import { getAllLines } from "@mm/solver/getAllLines";

const random = createRandom();

export const generateLine = (p: number, n: number) =>
  Array.from({ length: n }, () => Math.floor(random() * p)) as Line;

export const play = (p: number, solution: Line) => {
  const allLines = getAllLines(p, solution.length);
  let possibleLines = [...allLines];

  for (let k = 100; k--; ) {
    const candidate =
      allLines.length === possibleLines.length
        ? getBestDefaultLine(p, solution.length)
        : getBestLine(possibleLines);

    if (!candidate) return;

    const feedback = getFeedback(solution, candidate);

    possibleLines = possibleLines.filter((l) =>
      isValidSolutionForRow({ line: candidate, feedback }, l)
    );

    if (possibleLines.length <= 1) return possibleLines[0];
  }
};
