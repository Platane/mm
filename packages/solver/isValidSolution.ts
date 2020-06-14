import { Row, Line } from "./type";
import { getFeedback } from "./getFeedback";

export const isValidSolutionForRow = (row: Row, candidate: Line) => {
  // assuming candidate is the solution

  // then the feedback should be
  const feedback = getFeedback(row.line, candidate);

  return (
    row.feedback.badPosition === feedback.badPosition &&
    row.feedback.correct === feedback.correct
  );
};

export const isValidSolution = (rows: Row[], candidate: Line) =>
  rows.every((row) => isValidSolutionForRow(row, candidate));
