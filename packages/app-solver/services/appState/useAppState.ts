import { useReducer, useMemo, useCallback } from "react";
import { useSharedCommunication } from "@mm/app-game/services/communication/useSharedCommunication";
import { reduce } from "./reducer";
import { getInitialState } from "./initialState";
import type { Page, Action } from "./reducer";
import type { Line, Feedback } from "@mm/solver/type";
import type { ColorScheme } from "@mm/app-game/services/colorScheme";

export const useAppState = () => {
  const [state, internalDispatch] = useReducer(reduce, null, getInitialState);
  const { sessionId } = state;

  const onMessage = useCallback(
    (m: any) => {
      if (!m.sessionId || m.sessionId === sessionId) internalDispatch(m);
    },
    [sessionId]
  );

  const { publish } = useSharedCommunication(onMessage);

  const actions = useMemo(() => {
    const globalDispatch = (action: Action) => {
      internalDispatch(action);
      publish({ ...action, sessionId });
    };

    return {
      setPage: (page: Page) => {
        internalDispatch({ type: "page:set", page });
      },

      bindSession: (sessionId: string) => {
        internalDispatch({ type: "session:bind", sessionId });
      },

      play: (line: Line) => {
        globalDispatch({ type: "game:play", line });
      },

      report: (line: Line, feedback: Feedback) => {
        globalDispatch({ type: "game:report", line, feedback });
      },

      setColorScheme: (colorScheme: ColorScheme) => {
        globalDispatch({ type: "colorScheme:set", colorScheme });
      },

      setGameConfig: (p: number, n: number) => {
        globalDispatch({ type: "game:config:set", p, n });
      },
    };
  }, [internalDispatch, publish, sessionId]);

  return { ...state, ...actions };
};
