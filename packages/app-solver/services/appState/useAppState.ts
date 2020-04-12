import { useReducer, useEffect, useCallback } from "react";
import { reduce } from "./reducer";
import { getInitialState, write } from "./initialState";
import { useConstant } from "@mm/app-game/components/_hooks/useConstant";
import { createSharedCommunication } from "@mm/app-game/services/communication/createSharedCommunication";
import type { Page, Action } from "./reducer";
import type { Line, Feedback } from "@mm/solver/type";
import type { ColorScheme } from "@mm/app-game/services/colorScheme";

export const useAppState = () => {
  const [state, internalDispatch] = useReducer(reduce, null, getInitialState);

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

  const setPage = useCallback((page: Page) => {
    internalDispatch({ type: "page:set", page });
  }, []);
  const play = useCallback((line: Line) => {
    dispatch({ type: "game:play", line });
  }, []);
  const report = useCallback((line: Line, feedback: Feedback) => {
    dispatch({ type: "game:report", line, feedback });
  }, []);
  const setColorScheme = useCallback((colorScheme: ColorScheme) => {
    dispatch({ type: "colorScheme:set", colorScheme });
  }, []);
  const setGameConfig = useCallback((p: number, n: number) => {
    dispatch({ type: "game:config:set", p, n });
  }, []);

  return { ...state, setPage, setColorScheme, setGameConfig, report, play };
};
