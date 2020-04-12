import produce from "immer";
import { Row, Line } from "@mm/solver/type";
import { getRandomLine } from "@mm/solver/getRandomtLine";
import { generateId } from "@mm/utils/generateId";
import { colorSchemes } from "../../components/theme";
import { getFeedback } from "@mm/solver/getFeedback";

export type Page = "game" | "config" | "onboarding";

export type Game = {
  id: string;
  solution: Line;
  rows: Row[];
};
export type State = {
  p: number;
  n: number;
  colorScheme: string[][];

  game: Game;

  page: Page;
};

export type Action =
  | { type: "game:config:set"; n?: number; p?: number }
  | { type: "game:reset" }
  | { type: "game:play"; line: Line }
  | { type: "colorScheme:set"; colorScheme: string[][] }
  | { type: "page:set"; page: Page };

export const createGame = (p: number, n: number) => ({
  rows: [],
  solution: getRandomLine(p, n),
  id: generateId(),
});

const reduce_ = (state: State, action: Action): State => {
  switch (action.type) {
    case "colorScheme:set":
      return { ...state, colorScheme: action.colorScheme };
    case "game:config:set": {
      const { p, n } = { ...state, ...action };
      return { ...state, p, n };
    }
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
    ) as string[][],
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
