/**
 * empiric
 */
export const getBestDefaultLine = (p: number, n: number) => {
  const u = Math.ceil((p / 5) * 3);

  return Array.from({ length: n }, (_, i) => (i % u) % p).sort();
};
