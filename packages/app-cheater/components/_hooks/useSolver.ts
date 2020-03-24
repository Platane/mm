import { useState, useEffect, useMemo } from "react";
import { allLines } from "@mm/solver/allLines";
import { Line, Feedback, Row } from "@mm/solver/type";
import {
  isValidSolutionForRow,
  isValidSolution,
} from "@mm/solver/isValidSolution";
import { getBestLine } from "../../services/solver/getBestLine";

const defaultSolution: Line = [5, 5, 3, 6];

export const useSolver = (initialRows: Row[] = []) => {
  const initialLines = useMemo(
    () => allLines.filter((l) => isValidSolution(initialRows, l)),
    [initialRows]
  );
  const [rows, setRows] = useState(initialRows);
  const [lines, setLines] = useState(initialLines);
  const [candidate, setCandidate] = useState<Line | null>(defaultSolution);

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
