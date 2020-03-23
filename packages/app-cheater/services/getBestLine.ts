// @ts-ignore
import worker from "workerize-loader!@mm/solver/getBestLine";
import { Line } from "@mm/solver/type";

const instance = worker();

export const getBestLine = (possibleLines: Line[]): Promise<Line | null> =>
  instance.getBestLine(possibleLines);
