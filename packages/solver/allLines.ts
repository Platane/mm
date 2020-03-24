import { createRandom } from "@mm/utils/createRand";
import type { Peg, Line } from "./type";

const dots: Peg[] = [1, 2, 3, 4, 5, 6];

const getCombinaison = (k: number): Peg[][] => {
  if (k === 0) return [];
  if (k === 1) return dots.map((d) => [d]);

  return getCombinaison(k - 1)
    .map((l) => dots.map((d) => [...l, d]))
    .flat(1);
};

const random = createRandom();
const shuffle = <T>(a: T[]) => {
  for (let i = a.length - 1; i--; ) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const allLines = shuffle(getCombinaison(4) as Line[]);
