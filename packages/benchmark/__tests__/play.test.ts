import { play } from "../play";
import { lineToEmoji } from "@mm/solver/emojis";
import { createRandom } from "@mm/utils/createRand";
import { getRandomLine } from "@mm/solver/getRandomtLine";

const random = createRandom();

const samples = [
  //

  { solution: [0, 0], p: 2 },
  { solution: [0, 1], p: 2 },
  { solution: [0, 1, 2, 3], p: 4 },
  { solution: [0, 1, 2, 3], p: 6 },
  { solution: [0, 1, 0, 0], p: 2 },
  { solution: [0, 1, 0, 0, 1, 1, 0], p: 2 },

  { solution: getRandomLine(6, 4, random), p: 6 },
  { solution: getRandomLine(6, 4, random), p: 6 },
  { solution: getRandomLine(6, 4, random), p: 6 },
];

samples.forEach(({ solution, p }) => {
  it(`should resolve ${p}/${solution.length} ${lineToEmoji(solution)}`, () => {
    expect(play(p, solution)).toEqual(solution);
  });
});
