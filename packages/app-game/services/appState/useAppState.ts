import { useReducer, useEffect, useMemo, useCallback, useRef } from "react";
import { useSharedCommunication } from "../communication/useSharedCommunication";
import { reduce } from "./reducer";
import { getInitialState, write } from "./initialState";
import type { Line } from "@mm/solver/type";
import type { Page, Action } from "./reducer";
import type { ColorScheme } from "../colorScheme";

export const useAppState = () => {
  const [state, internalDispatch] = useReducer(reduce, null, getInitialState);

  const sessionId = useRef("");
  const onMessage = useCallback((m: any) => {
    if (m.sessionId === sessionId.current) internalDispatch(m);
  }, []);

  const { publish, clientId } = useSharedCommunication(onMessage);

  sessionId.current = clientId;

  // persist config
  useEffect(() => {
    write(state);
  }, [state.n, state.p, state.colorScheme]);

  // publish game update
  useEffect(() => {
    publish({
      type: "session:updated",
      sessionId: sessionId.current,
      session: {
        date: Date.now(),
        id: sessionId.current,
        n: state.n,
        p: state.p,
        colorScheme: state.colorScheme,
        game: { rows: state.game.rows, id: state.game.id },
      },
    });
  }, [state.game, publish]);

  const actions = useMemo(() => {
    const globalDispatch = (action: Action) => {
      internalDispatch(action);
      publish({ ...action, sessionId: sessionId.current });
    };

    return {
      setPage: (page: Page) => {
        internalDispatch({ type: "page:set", page });
      },

      play: (line: Line) => {
        globalDispatch({ type: "game:play", line });
      },

      reset: () => {
        globalDispatch({ type: "game:reset" });
      },

      setColorScheme: (colorScheme: ColorScheme) => {
        globalDispatch({ type: "colorScheme:set", colorScheme });
      },

      setGameConfig: (p: number, n: number) => {
        globalDispatch({ type: "game:config:set", p, n });
      },
    };
  }, [internalDispatch, publish]);

  return { ...state, ...actions };
};
