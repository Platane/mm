// @ts-ignore
import worker from "workerize-loader!./worker";
import { Line } from "./type";

const instance = worker();

export const getBestLineAsync = (possibleLines: Line[]): Line | null =>
  instance.getBestLine(possibleLines);
