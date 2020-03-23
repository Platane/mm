import { createRandom } from "./createRand";
import { getBestLine } from "@mm/solver/getBestLine";
import { getFeedback } from "@mm/solver/getFeedback";
import { isValidSolutionForRow } from "@mm/solver/isValidSolution";
import { allLines } from "@mm/solver/allLines";
import { Line, Peg } from "@mm/solver/type";

const random = createRandom();

const randomDot = () => (Math.floor(random() * 6) + 1) as Peg;

export const generateLine = () => Array.from({ length: 4 }, randomDot) as Line;

export const play = (solution: Line) => {
  let possibleLines = [...allLines];

  for (let k = 100; k--; ) {
    const candidate =
      allLines.length === possibleLines.length
        ? ([1, 2, 3, 4] as Line)
        : getBestLine(possibleLines);

    if (!candidate) return undefined;

    const feedback = getFeedback(solution, candidate);

    possibleLines = possibleLines.filter((l) =>
      isValidSolutionForRow({ line: candidate, feedback }, l)
    );

    if (possibleLines.length <= 1) return possibleLines[0];
  }
};
