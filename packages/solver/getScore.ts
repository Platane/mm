import type { Line, Feedback } from "./type";
import { getFeedback } from "./getFeedback";
import { isValidSolutionForRow } from "./isValidSolution";

/**
 * given the played lines,
 * the list of possible lines
 * compute a score on a specific line
 *
 * assuming the solution could be any of the possible line, uniformly
 *
 * reflect the fact that the line is still valid next with most of the possible solutions
 *
 * lower is better
 */

export const getScore = (possibleLines: Line[], candidate: Line) => {
  const getNextPossibleLineNumber = (feedback: Feedback) =>
    possibleLines.filter((l) =>
      isValidSolutionForRow({ feedback, line: candidate }, l)
    ).length;

  const getNextPossibleLineNumberMemo = createMemo(
    getNextPossibleLineNumber,
    ({ correct, badPosition }) => correct + "." + badPosition
  );

  return possibleLines.reduce((sum, solution) => {
    // if this line is the solution

    // then the next feedback will be
    const feedback = getFeedback(candidate, solution);

    // in that case there will be N possible line after
    const n = getNextPossibleLineNumberMemo(feedback);

    return sum + n;
  }, 0);
};

const createMemo = <I, O>(
  fn: (i: I) => O,
  serialize: (i: I) => string
): ((i: I) => O) => {
  const memo: Record<string, O> = {};

  return (i: I) => {
    const key = serialize(i);
    if (!(key in memo)) memo[key] = fn(i);
    return memo[key];
  };
};
