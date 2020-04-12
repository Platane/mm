import * as storage from "@mm/app-game/services/localStorage";
import { reduce } from "./reducer";
import { useReducer, useEffect, useCallback } from "react";
import { colorSchemes } from "@mm/app-game/components/theme";
import { createSharedCommunication } from "@mm/app-game/services/communication/createSharedCommunication";
import { useConstant } from "@mm/app-game/components/_hooks/useConstant";
import type { State, Page } from "./reducer";
import type { Line, Feedback } from "@mm/solver/type";

const storageKey = "game-config";

const getInitialState = (): State => {
  const c = storage.read(storageKey);

  const state0 = {
    n: 0,
    p: 0,
    linePlayed: [],
    colorScheme: [],
    game: { id: "", rows: [] },
    page: "onboarding",
  } as State;

  let state = reduce(state0, { type: "game:config:set", p: 6, n: 4 } as any);

  if (c && c.p && c.n) {
    state = reduce(state, { type: "page:set", page: "instruction" });
    state = reduce(state, { type: "game:config:set", ...c });
  }

  if (c && c.colorScheme) {
    const colorScheme = colorSchemes.find(
      (cs) => JSON.stringify(cs) === JSON.stringify(c.colorScheme)
    );
    if (colorScheme)
      state = reduce(state, { type: "colorScheme:set", colorScheme });
  }

  return state;
};

export const useAppState = () => {
  const [state, dispatch] = useReducer(reduce, getInitialState());

  const com = useConstant(() => createSharedCommunication());
  useEffect(() => {
    com.dispose();
  }, []);

  useEffect(() => {
    storage.write(storageKey, state);
  }, [state.n, state.p, state.colorScheme]);

  useEffect(() => {
    com.setGame({
      n: state.n,
      p: state.p,
      rows: state.game.rows,
      colorScheme: state.colorScheme,
    });
  }, [state.game]);

  const report = useCallback((feedback: Feedback) => {
    dispatch({ type: "game:report", feedback });
  }, []);
  const played = useCallback(
    (line: Line) => {
      com.pushAction(state.game.id, { type: "game:play", line });
      dispatch({ type: "game:played", line });
    },
    [state.game.id]
  );
  const setPage = useCallback(
    (page: Page) => dispatch({ type: "page:set", page }),
    []
  );
  const setColorScheme = useCallback(
    (colorScheme: [string, string][]) =>
      dispatch({ type: "colorScheme:set", colorScheme }),
    []
  );
  const setGameConfig = useCallback(
    (p: number, n: number) => dispatch({ type: "game:config:set", p, n }),
    []
  );

  return { ...state, setPage, setColorScheme, setGameConfig, played, report };
};
