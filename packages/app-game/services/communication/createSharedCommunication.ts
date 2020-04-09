// @ts-ignore
import workerUrl from "worker-plugin/dist/loader!./communication-worker";

export const createSharedCommunication = () => {
  // @ts-ignore
  const worker = new SharedWorker(workerUrl);

  worker.onError = console.error;

  worker.port.start();

  const getGame = createRPC(worker.port, "game:get");
  const getLastGame = createRPC(worker.port, "game:last:get");

  const setGame = (id: string, p: number, n: number, rows: any[]) => {
    worker.port.postMessage({ type: "game:set", id, p, n, rows });
  };

  const dispose = () => {
    worker.port.close();
  };

  const subscribe = (fn: (game: any) => void) => {
    let id = "";

    const handler = ({ type, key, ...data }: any) => {
      if (data.key === "game:get" && data.game && data.game.id === id)
        fn(data.game);
    };

    getLastGame().then(({ game }: any) => {
      fn(game);

      if (!game) return;

      id = game.id;

      worker.port.postMessage({ type: "game:subscribe", id });
      worker.port.addEventListener("message", handler);
    });

    return () => {
      worker.port.postMessage({ type: "game:unsubscribe", id });
      worker.port.removeEventListener("message", handler);
    };
  };

  return { dispose, setGame, subscribe };
};

const createRPC = (port: any, type: string) => (param?: any) =>
  new Promise((resolve, reject) => {
    const key = Math.random().toString(16);

    port.addEventListener("message", ({ type, key, ...data }: any) => {
      if (data.key === key) return resolve(data);
    });

    port.postMessage({ type, key, ...param });
  });
