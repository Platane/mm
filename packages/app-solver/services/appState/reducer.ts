import produce from "immer";
import { generateId } from "@mm/utils/generateId";
import type { Row, Line, Feedback } from "@mm/solver/type";
import { ColorScheme, colorSchemes } from "@mm/app-game/services/colorScheme";
import type { Session } from "@mm/app-game/services/communication/session";

export type Page = "game-instruction" | "game-report" | "onboarding";

export type Game = {
  id: string;
  rows: Row[];
};
export type State = {
  clientId: string | null;
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
      return { ...state, game: { id: generateId(), rows: [] } };

    case "session:list": {
      const [session] = action.sessions.sort((a, b) => b.date - a.date);

      if (!session) return state;

      return { ...session, page: "game-instruction" };
    }

    case "session:updated": {
      if (action.session.clientId !== state.clientId) return state;

      return { ...action.session, page: "game-instruction" };
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
    game: { id: generateId(), rows: [] },
  };
};

const ensureGameConfigLimit = (reduce: Reduce): Reduce => (state, action) => {
  const nextState = reduce(state, action);

  const l = 10;

  if (nextState.p > l || nextState.n > l)
    return {
      ...nextState,
      n: Math.min(10, nextState.n),
      p: Math.min(10, nextState.p),
    };

  return nextState;
};

export const reduce = ensureColorScheme(
  ensureGameConfig(ensureGameConfigLimit(reduce_))
);
