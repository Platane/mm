/**
 * empiric
 */
export const getBestDefaultLine = (p: number, n: number) => {
  const u = Math.ceil((n / 3) * 2);

  return Array.from({ length: n }, (_, i) => (i % u) % p).sort();
};
