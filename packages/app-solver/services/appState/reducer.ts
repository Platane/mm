import produce from "immer";
import { generateId } from "@mm/utils/generateId";
import { colorSchemes } from "@mm/app-game/components/theme";
import type { Row, Line, Feedback } from "@mm/solver/type";

export type Page = "report" | "instruction" | "onboarding";

export type Game = {
  id: string;
  rows: Row[];
};
export type State = {
  p: number;
  n: number;
  colorScheme: [string, string][];

  linePlayed: Line;

  game: Game;

  page: Page;
};

export type Action =
  | { type: "game:config:set"; n?: number; p?: number }
  | { type: "game:reset" }
  | { type: "game:played"; line: Line }
  | { type: "game:report"; feedback: Feedback }
  | { type: "colorScheme:set"; colorScheme: [string, string][] }
  | { type: "page:set"; page: Page };

const reduce_ = (state: State, action: Action): State => {
  switch (action.type) {
    case "colorScheme:set":
      return { ...state, colorScheme: action.colorScheme };
    case "game:config:set": {
      const { p, n } = { ...state, ...action };
      return { ...state, p, n };
    }
    case "game:reset":
      return {
        ...state,
        game: { rows: [], id: generateId() },
        page: "instruction",
      };
    case "game:report": {
      if (state.page === "report")
        return produce(state, ({ game: { rows }, page }) => {
          rows.push({ line: state.linePlayed, feedback: action.feedback });
          page = "instruction";
        });
      else return state;
    }
    case "game:played": {
      if (state.page === "instruction")
        return { ...state, linePlayed: action.line, page: "report" };
      else return state;
    }
    case "page:set":
      return { ...state, page: action.page };

    default:
      return state;
  }
};

type Reduce = typeof reduce_;
const ensureColorScheme = (reduce: Reduce): Reduce => (state, action) => {
  const nextState = reduce(state, action);
  if (nextState.p === nextState.colorScheme.length) return nextState;

  return {
    ...nextState,
    colorScheme: colorSchemes.find((cs) => cs.length === nextState.p) as [
      string,
      string
    ][],
  };
};

const ensureGameConfig = (reduce: Reduce): Reduce => (state, action) => {
  const nextState = reduce(state, action);

  if (nextState.p === state.p && nextState.n === state.n) return nextState;

  return {
    ...nextState,
    linePlayed: [],
    game: { rows: [], id: generateId() },
  };
};

export const reduce = ensureColorScheme(ensureGameConfig(reduce_));
