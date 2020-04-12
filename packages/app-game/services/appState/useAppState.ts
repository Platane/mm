import { useReducer, useEffect, useCallback } from "react";
import { reduce } from "./reducer";
import { useConstant } from "../../components/_hooks/useConstant";
import { createSharedCommunication } from "../communication/createSharedCommunication";
import { getInitialState, write } from "./initialState";
import type { Line } from "@mm/solver/type";
import type { Page, Action } from "./reducer";
import type { ColorScheme } from "../colorScheme";

const state0 = getInitialState();

export const useAppState = () => {
  const [state, internalDispatch] = useReducer(reduce, state0);

  const com = useConstant(() =>
    createSharedCommunication(internalDispatch as any)
  );
  useEffect(() => () => com.dispose(), []);

  const dispatch = useCallback((action: Action) => {
    internalDispatch(action);
    com.publish(action);
  }, []);

  useEffect(() => {
    write(state);
  }, [state.n, state.p, state.colorScheme]);

  useEffect(() => {
    dispatch({
      type: "session:updated",
      session: {
        date: Date.now(),
        clientId: com.clientId,
        n: state.n,
        p: state.p,
        colorScheme: state.colorScheme,
        game: { rows: state.game.rows, id: state.game.id },
      },
    });
  }, [state.game]);

  const setPage = useCallback((page: Page) => {
    internalDispatch({ type: "page:set", page });
  }, []);
  const play = useCallback((line: Line) => {
    dispatch({ type: "game:play", line });
  }, []);
  const reset = useCallback(() => {
    dispatch({ type: "game:reset" });
  }, []);
  const setColorScheme = useCallback((colorScheme: ColorScheme) => {
    dispatch({ type: "colorScheme:set", colorScheme });
  }, []);
  const setGameConfig = useCallback((p: number, n: number) => {
    dispatch({ type: "game:config:set", p, n });
  }, []);

  return { ...state, setPage, setColorScheme, setGameConfig, reset, play };
};
