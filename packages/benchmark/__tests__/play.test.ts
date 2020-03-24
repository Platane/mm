import { play, generateLine } from "../play";
import { lineToEmoji } from "@mm/solver/emojis";
import { Line } from "@mm/solver/type";

const samples: Line[] = [
  //

  [3, 3, 3, 3],
  [3, 4, 1, 2],
  [6, 2, 2, 6],

  generateLine(),
  generateLine(),
  generateLine(),
  generateLine(),
];

samples.forEach((solution) => {
  it(`should resolve ${lineToEmoji(solution)}`, () => {
    expect(play(solution)).toEqual(solution);
  });
});
