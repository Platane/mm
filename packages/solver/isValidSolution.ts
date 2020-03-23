import { ImcompleteLine, Row } from "./type";
import { getFeedback } from "./getFeedback";

export const isValidSolutionForRow = (row: Row, candidate: ImcompleteLine) => {
  const feedback = getFeedback(row.line, candidate);

  const dblack = row.feedback.correct - feedback.correct;
  const dwhite = row.feedback.badPosition - feedback.badPosition;

  return (
    // should not have more black than the target
    dblack >= 0 &&
    // should not have more black than the target
    // /!\ some white can be changed to black by completing l
    dwhite + Math.min(dblack, 4 - candidate.length) >= 0 &&
    // enougth free space to add the missing black and white
    dblack + dwhite <= 4 - candidate.length
  );
};

export const isValidSolution = (rows: Row[], candidate: ImcompleteLine) =>
  rows.every((row) => isValidSolutionForRow(row, candidate));
