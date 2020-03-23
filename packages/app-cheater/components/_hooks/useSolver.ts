import { useState, useEffect, useMemo } from "react";
import { allLines } from "@mm/solver/allLines";
import { getBestLine } from "../../services/getBestLine";
import { Line, Feedback, Row } from "@mm/solver/type";
import {
  isValidSolutionForRow,
  isValidSolution,
} from "@mm/solver/isValidSolution";

export const useSolver = (initialRows: Row[] = []) => {
  const initialLines = useMemo(
    () => allLines.filter((l) => isValidSolution(initialRows, l)),
    [initialRows]
  );
  const [rows, setRows] = useState(initialRows);
  const [lines, setLines] = useState(initialLines);
  const [candidate, setCandidate] = useState([1, 1, 3, 2] as Line | null);

  useEffect(() => {
    if (allLines.length === lines.length) return;

    let cancel = false;

    setCandidate(null);
    getBestLine(lines).then((candidate) => {
      if (!cancel) setCandidate(candidate);
    });

    return () => {
      cancel = true;
    };
  }, [lines]);

  const nextTurn = (line: Line, feedback: Feedback) => {
    const row = { feedback, line };

    setRows([...rows, row]);
    setLines(lines.filter((l) => isValidSolutionForRow(row, l)));
  };

  return { candidate, rows, nextTurn, availableLines: lines };
};
