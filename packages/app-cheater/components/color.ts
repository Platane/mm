import { Peg } from "@mm/solver/type";

export const colors = {
  ["sixColors" as const]: {
    1: "#fce514",
    2: "#2678f4",
    3: "#df2525",
    4: "#6acc14",
    5: "#bb18c6",
    6: "#fba106",
  } as Record<Peg, string>,
  ["fourColors" as const]: {
    1: "#fce514",
    2: "#2678f4",
    3: "#df2525",
    4: "#6acc14",
    5: "#f6f6f6",
    6: "#444444",
  } as Record<Peg, string>,
};

export type ColorName = keyof typeof colors;

export const colorNames = (Object.keys(colors) as unknown) as ColorName;

export const UI = ["#b6e3ce", "#e4f4d9", "#f24b55", "#6a6d70"];
