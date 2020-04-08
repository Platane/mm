import { useState, useEffect, useMemo } from "react";
import { Line, Feedback, Row } from "@mm/solver/type";
import {
  isValidSolutionForRow,
  isValidSolution,
} from "@mm/solver/isValidSolution";
import { getBestDefaultLine } from "@mm/solver/getBestDefaultLine";
import { getAllLines } from "@mm/solver/getAllLines";
import { getBestLine } from "../../services/solver/getBestLine";

const computing = Symbol("pending");

export const useSolver = (p: number, n: number, initialRows: Row[] = []) => {
  const allLines = useMemo(() => getAllLines(p, n), [p, n]);
  const defaultSolution = useMemo(() => getBestDefaultLine(p, n), [p, n]);

  const initialLines = useMemo(
    () => allLines.filter((l) => isValidSolution(initialRows, l)),
    [initialRows, allLines]
  );

  const [rows, setRows] = useState(initialRows);
  const [lines, setLines] = useState(initialLines);
  const [candidate, setCandidate] = useState<Line | null | typeof computing>(
    computing
  );

  useEffect(() => {
    let cancel = false;

    if (allLines.length === lines.length) {
      setCandidate(defaultSolution);
    } else {
      setCandidate(computing);
      getBestLine(lines).then((candidate) => {
        if (!cancel) setCandidate(candidate);
      });
    }

    return () => {
      cancel = true;
    };
  }, [lines]);

  const nextTurn = (line: Line, feedback: Feedback) => {
    const row = { feedback, line };

    setRows([...rows, row]);
    setLines(lines.filter((l) => isValidSolutionForRow(row, l)));
  };

  return {
    computing: candidate === computing,
    candidate: candidate === computing ? null : candidate,
    rows,
    nextTurn,
    availableLines: lines,
  };
};
