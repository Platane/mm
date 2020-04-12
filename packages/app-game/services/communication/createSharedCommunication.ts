// @ts-ignore
import workerUrl from "worker-plugin/dist/loader!./communication-worker";
import { createRPC } from "./utils";
import type { Row } from "@mm/solver/type";
import type { Message } from "./communication-worker";
import type { Action } from "../appState/reducer";

export const createSharedCommunication = (
  onAction?: (
    m: Extract<
      Message,
      { type: "game:play" | "game:reset" | "colorScheme:set" }
    >
  ) => void
) => {
  // @ts-ignore
  const worker = new SharedWorker(workerUrl);

  worker.onError = console.error;

  worker.port.start();

  const getGameList = createRPC(worker.port, "game:list");
  const getGame: (param: { id: string }) => Promise<any> = createRPC(
    worker.port,
    "game:get"
  );

  const setGame: (m: {
    rows: Row[];
    n: number;
    p: number;
    colorScheme: string[][];
  }) => void = createRPC(worker.port, "game:set");

  const subscribe = (id: string, onCallback: (g: any) => void) => {
    const handle = ({ type, ...data }: any) => {
      if (type === "game:set@res" && data && data.id === id) onCallback(data);
    };

    worker.port.addEventListener("message", handle);
    worker.port.postMessage({ type: "subscribe", id });

    createRPC(worker.port, "subscribe")({ id });

    return () => {
      worker.port.removeEventListener("message", handle);
      worker.port.postMessage({ type: "unsubscribe", id });
    };
  };

  const pushAction = (
    id: string,
    action: Extract<
      Action,
      { type: "game:play" | "game:reset" | "colorScheme:set" }
    >
  ) => worker.port.postMessage({ ...action, id });

  const handle = ({ data }: any) => {
    if (
      onAction &&
      data &&
      data.type &&
      ["game:play", "game:reset", "colorScheme:set"].includes(data.type)
    )
      onAction(data);
  };

  worker.port.addEventListener("message", handle);

  const dispose = () => {
    worker.port.close();
    worker.port.removeEventListener("message", handle);
  };

  return { dispose, setGame, getGame, getGameList, pushAction, subscribe };
};
