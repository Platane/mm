import { generateLine, play } from "./play";
import { lineToEmoji } from "@mm/solver/emojis";

const mean = (arr: number[]) => arr.reduce((s, x) => s + x, 0) / arr.length;

const q = (a: number, b: number, arr: number[]) =>
  mean(
    arr
      .slice()
      .sort((a, b) => (a > b ? 1 : -1))
      .slice(Math.floor(arr.length * a), Math.ceil(arr.length * b))
  );

export const run = async (p: number, n: number, k: number) => {
  const stats = [];
  for (; k--; ) {
    const start = Date.now();

    const solution = generateLine(p, n);
    const found = play(p, solution);

    console.log(
      "---\n",
      lineToEmoji(solution),
      "\n",
      found && lineToEmoji(found)
    );

    const delta = Date.now() - start;

    stats.push(delta);
  }

  const average_duration = mean(stats);
  const q95_duration = q(0.95, 1, stats);

  console.log(`
        ${stats.length} games

        duration :
        average ${average_duration} ms
        5% worst ${q95_duration} ms
    `);
};
