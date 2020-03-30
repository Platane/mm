import { Line } from "./type";

export const getRandomLine = (
  p: number,
  n: number,
  random = Math.random
): Line => Array.from({ length: n }, () => Math.floor(random() * p));
