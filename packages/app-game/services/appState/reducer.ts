import produce from "immer";
import { getFeedback } from "@mm/solver/getFeedback";
import { createGame } from "./createGame";
import { colorSchemes } from "../colorScheme";
import type { ColorScheme } from "../colorScheme";
import type { Row, Line, Feedback } from "@mm/solver/type";
import type { Session } from "../communication/session";

export type Page = "game" | "config" | "onboarding";

export type Game = {
  id: string;
  solution: Line;
  rows: Row[];
};
export type State = {
  p: number;
  n: number;
  colorScheme: ColorScheme;
  game: Game;
  page: Page;
};

export type Action =
  | { type: "game:config:set"; n?: number; p?: number }
  | { type: "colorScheme:set"; colorScheme: ColorScheme }
  | { type: "game:reset" }
  | { type: "game:play"; line: Line }
  | { type: "game:played"; line: Line }
  | { type: "game:report"; line: Line; feedback: Feedback }
  | { type: "session:updated"; session: Session }
  | { type: "session:list"; sessions: Session[] }
  | { type: "page:set"; page: Page };

const reduce_ = (state: State, action: Action): State => {
  switch (action.type) {
    case "colorScheme:set":
      return { ...state, colorScheme: action.colorScheme };

    case "game:config:set":
      return { ...state, n: action.n || state.n, p: action.p || state.p };

    case "game:reset":
      return { ...state, game: createGame(state.p, state.n) };

    case "game:play":
      return produce(state, ({ game: { solution, rows } }) => {
        rows.push({
          line: action.line,
          feedback: getFeedback(solution, action.line),
        });
      });

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
    colorScheme: colorSchemes.find(
      (cs) => cs.length === nextState.p
    ) as ColorScheme,
  };
};

const ensureGameConfig = (reduce: Reduce): Reduce => (state, action) => {
  const nextState = reduce(state, action);

  if (nextState.p === state.p && nextState.n === state.n) return nextState;

  return {
    ...nextState,
    game: createGame(nextState.p, nextState.n),
  };
};

export const reduce = ensureColorScheme(ensureGameConfig(reduce_));
