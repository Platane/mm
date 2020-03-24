import { play, generateLine } from "../play";
import { lineToEmoji } from "@mm/solver/emojis";

const samples = [
  //

  { solution: [0, 0], p: 2 },
  { solution: [0, 1], p: 2 },
  { solution: [0, 1, 2, 3], p: 4 },
  { solution: [0, 1, 2, 3], p: 6 },
  { solution: [0, 1, 0, 0], p: 2 },
  { solution: [0, 1, 0, 0, 1, 1, 0], p: 2 },

  { solution: generateLine(6, 4), p: 6 },
  { solution: generateLine(6, 4), p: 6 },
  { solution: generateLine(6, 4), p: 6 },
];

samples.forEach(({ solution, p }) => {
  it(`should resolve ${p}/${solution.length} ${lineToEmoji(solution)}`, () => {
    expect(play(p, solution)).toEqual(solution);
  });
});
