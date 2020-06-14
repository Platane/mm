import { getRandomLine } from "@mm/solver/getRandomtLine";
import { generateId } from "@mm/utils/generateId";

export const createGame = (p: number, n: number) => ({
  rows: [],
  solution: getRandomLine(p, n),
  id: generateId(),
});
