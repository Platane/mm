import { ImcompleteLine, Feedback } from "./type";

const emojis = [" 🖤", " 🧡", " 💛", " 💚", " 💙", " 💜"];

export const toEmoji = (line: ImcompleteLine) =>
  (line as number[])
    .map((i) => emojis[i - 1])
    .join("")
    .padEnd(8, " ");

export const feedbackToEmoji = ({ correct, badPosition }: Feedback) =>
  (" ⚫️".repeat(correct) + " ⚪️".repeat(badPosition)).padEnd(8);
