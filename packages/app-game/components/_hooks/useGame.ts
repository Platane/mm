import { useState } from "react";
import { Line, Row } from "@mm/solver/type";
import { getRandomLine } from "@mm/solver/getRandomtLine";
import { getFeedback } from "@mm/solver/getFeedback";
import { generateId } from "@mm/utils/generateId";

export const useGame = (p: number, n: number) => {
  const [state, setState] = useState({
    rows: [] as Row[],
    solution: getRandomLine(p, n),
    id: generateId(),
  });

  const playLine = (line: Line) =>
    setState(({ solution, rows, ...rest }) => ({
      rows: [...rows, { line, feedback: getFeedback(solution, line) }],
      solution,
      ...rest,
    }));

  const reset = () =>
    setState({
      rows: [],
      solution: getRandomLine(p, n),
      id: generateId(),
    });

  return { ...state, playLine, reset };
};
