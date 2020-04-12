import * as storage from "../localStorage";
import { reduce } from "./reducer";
import type { State } from "./reducer";
import { colorSchemes, colorSchemeEquals } from "../colorScheme";

const storageKey = "game-config";

export const getInitialState = (): State => {
  const c = storage.read(storageKey);

  const state0 = {
    n: 0,
    p: 0,
    colorScheme: [],
    game: { id: "", rows: [], solution: [] },
    page: "onboarding",
  } as State;

  let state = reduce(state0, { type: "game:config:set", p: 6, n: 4 } as any);

  if (c && c.p && c.n) {
    state = reduce(state, { type: "page:set", page: "game" });
    state = reduce(state, { type: "game:config:set", ...c });
  }

  if (c && c.colorScheme) {
    const colorScheme = colorSchemes.find((cs) =>
      colorSchemeEquals(cs, c.colorScheme)
    );
    if (colorScheme)
      state = reduce(state, { type: "colorScheme:set", colorScheme });
  }

  return state;
};

export const write = ({ n, p, colorScheme }: State) =>
  storage.write(storageKey, { n, p, colorScheme });
