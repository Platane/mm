import { createRandom } from "@mm/utils/createRand";
import type { Peg, Line } from "./type";

const getPegs = (p: number): Peg[] => Array.from({ length: p }, (_, i) => i);

const getCombinaison = <T>(values: T[], n: number): T[][] => {
  if (n === 0) return [];
  if (n === 1) return values.map((v) => [v]);

  return getCombinaison(values, n - 1)
    .map((l) => values.map((v) => [...l, v]))
    .flat(1);
};

const random = createRandom();
const shuffle = <T>(a: T[]) => {
  if (a.length > 0)
    for (let i = a.length - 1; i--; ) {
      const j = Math.floor(random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  return a;
};

export const getAllLines = (p: number, n: number): Line[] =>
  shuffle(getCombinaison(getPegs(p), n));
