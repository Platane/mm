import { Feedback, Line } from "./type";

const emojis = [
  //  " 🖤", " 🧡", " 💛", " 💚", " 💙", " 💜"

  " ⚪️ ",
  " ⚫️ ",
  " 🔴 ",
  " 🔵 ",
  " ⛎ ",
  " 🉐 ",
  " ㊙️ ",
  " ㊗️ ",
  " 🉑 ",
  " ♈️ ",
  " ♉️ ",
  " ♊️ ",
  " ♋️ ",
  " ♌️ ",
  " ♍️ ",
  " ♎️ ",
  " ♏️ ",
  " ♐️ ",
  " ♑️ ",
  " ♒️ ",
  " ♓️ ",
];

export const lineToEmoji = (line: Line) =>
  (line as number[]).map((i) => emojis[i]).join("") + " ";

export const feedbackToEmoji = ({ correct, badPosition }: Feedback) =>
  "◾️".repeat(correct) + "◽️".repeat(badPosition);
