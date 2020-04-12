import type { Row } from "@mm/solver/type";
import type { ColorScheme } from "../colorScheme";

export type Session = {
  clientId: string;
  game: {
    id: string;
    rows: Row[];
  };
  n: number;
  p: number;
  colorScheme: ColorScheme;
  date: number;
};
