import type { Peg, Line } from "./type";

const dots: Peg[] = [1, 2, 3, 4, 5, 6];

const getCombinaison = (k: number): Peg[][] => {
  if (k === 0) return [];
  if (k === 1) return dots.map((d) => [d]);

  return getCombinaison(k - 1)
    .map((l) => dots.map((d) => [...l, d]))
    .flat(1);
};

export const allLines = getCombinaison(4) as Line[];
