import { play, generateLine } from "../play";
import { toEmoji } from "@mm/solver/emojis";
import { Line } from "@mm/solver/type";

const samples: Line[] = [
  //

  [3, 3, 3, 3],
  [3, 4, 1, 2],
  [6, 2, 2, 6],

  generateLine(),
  generateLine(),
  generateLine(),
];

samples.forEach((solution) => {
  it(`should resolve ${toEmoji(solution)}`, () => {
    expect(play(solution)).toEqual(solution);
  });
});
