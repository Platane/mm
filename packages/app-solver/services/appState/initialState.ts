import {
  colorSchemes,
  colorSchemeEquals,
} from "@mm/app-game/services/colorScheme";
import * as storage from "@mm/app-game/services/localStorage";
import { reduce } from "./reducer";
import type { State } from "./reducer";

const storageKey = "game-config__0";

export const getInitialState = (): State => {
  const c = storage.read(storageKey);

  const state0 = {
    availableSessions: [],
    sessionId: null,
    n: 0,
    p: 0,
    colorScheme: [],
    game: { id: "", rows: [] },
    page: "onboarding",
  } as State;

  let state = reduce(state0, { type: "game:config:set", p: 6, n: 4 } as any);

  if (c && c.p && c.n) {
    state = reduce(state, { type: "game:config:set", ...c });
    state = reduce(state, { type: "page:set", page: "game-instruction" });
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
