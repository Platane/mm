import { useState, useEffect } from "react";
import { useForcedUpdate } from "@mm/app-game/components/_hooks/useForcedUpdate";
import { isValidSolutionForRow } from "@mm/solver/isValidSolution";
import { getBestDefaultLine } from "@mm/solver/getBestDefaultLine";
import { getAllLines } from "@mm/solver/getAllLines";
import { getBestLine } from "../../services/solver/getBestLine";
import type { Line, Row } from "@mm/solver/type";

const rowEquals = (a: Row, b: Row) =>
  a.line.every((_, i) => a.line[i] === b.line[i]) &&
  a.feedback.badPosition === b.feedback.badPosition &&
  a.feedback.correct === b.feedback.correct;

const rowsEquals = (a: Row[], b: Row[]) =>
  a.length === b.length && a.every((_, i) => rowEquals(a[i], b[i]));

const createSolver = (p: number, n: number) => {
  const lines0 = getAllLines(p, n);
  const solution0 = getBestDefaultLine(p, n);

  let rows: Row[] = [];
  let solution: Line | null = solution0;
  let lines = lines0;
  let promise: Promise<void> | null = null;

  const update = (nextRows: Row[]) => {
    if (
      nextRows.length < rows.length ||
      !rows.every((_, i) => rowEquals(rows[i], nextRows[i]))
    ) {
      rows.length = 0;
      lines = lines0;
      solution = solution0;
      promise = null;
    }

    if (nextRows.length > rows.length) {
      for (const row of nextRows.slice(rows.length)) {
        rows.push(row);
        lines = lines.filter((l) => isValidSolutionForRow(row, l));
      }

      const p = getBestLine(lines).then((s) => {
        if (promise === p) {
          solution = s;
          promise = null;
        }
      });
      promise = p;
      return p;
    }

    return Promise.resolve();
  };

  const getRows = () => rows;
  const getPromise = () => promise;
  const getSolution = () => solution;
  const getComputing = () => !!promise;

  return { n, p, getSolution, getComputing, getPromise, getRows, update };
};

const solver0 = createSolver(0, 0);

export const useSolver = (p: number, n: number, rows: Row[] = []) => {
  const [solver, setSolver] = useState(solver0);
  const forceUpdate = useForcedUpdate();

  useEffect(() => {
    setSolver(createSolver(p, n));
  }, [p, n]);

  useEffect(() => {
    if (solver && solver.n === n && solver.p === p)
      solver.update(rows).then(forceUpdate);
  }, [solver, rows]);

  if (solver.n !== n || solver.p !== p || !rowsEquals(rows, solver.getRows()))
    return { computing: true, candidate: null };

  return {
    computing: solver.getComputing(),
    candidate: solver.getSolution(),
  };
};
