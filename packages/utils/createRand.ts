export const createRandom = () => {
  let seed = 38591850;

  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
};
