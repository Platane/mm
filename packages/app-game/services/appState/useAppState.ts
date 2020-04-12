import * as storage from "../localStorage";
import { reduce, State, Page } from "./reducer";
import { useReducer, useEffect, useCallback } from "react";
import { useConstant } from "../../components/_hooks/useConstant";
import { colorSchemes } from "../../components/theme";
import { createSharedCommunication } from "../communication/createSharedCommunication";
import { Line } from "@mm/solver/type";

const storageKey = "game-config";

const getInitialState = (): State => {
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

  const com = useConstant(() => createSharedCommunication(dispatch));
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

  const play = useCallback(
    (line: Line) => dispatch({ type: "game:play", line }),
    []
  );
  const setPage = useCallback(
    (page: Page) => dispatch({ type: "page:set", page }),
    []
  );
  const setColorScheme = useCallback(
    (colorScheme: string[][]) =>
      dispatch({ type: "colorScheme:set", colorScheme }),
    []
  );
  const setGameConfig = useCallback(
    (p: number, n: number) => dispatch({ type: "game:config:set", p, n }),
    []
  );

  return { ...state, setPage, setColorScheme, setGameConfig, play };
};
