const games: { id: string; rows: any[] }[] = [];
const subscriptions: Record<string, any[]> = {};

// @ts-ignore
self.onconnect = (e) => {
  const [port] = e.ports;

  port.addEventListener("message", ({ data: { type, key, ...data } }: any) => {
    console.log(port);

    switch (type) {
      case "game:set": {
        let game = games.find((g) => g.id === data.id);
        if (game) game.rows = data.rows;
        else games.push((game = { date: Date.now(), ...data }));

        for (const p of subscriptions[data.id] || [])
          p.postMessage({ type: "game:get", game, key });
      }

      case "game:get": {
        const game = games.find((g) => g.id === data.id);

        port.postMessage({ type: "game:get", game, key });
      }

      case "game:last:get": {
        port.postMessage({
          key,
          type: "game:last:get",
          game: games.slice(-1)[0],
        });
      }

      case "game:subscribe": {
        subscriptions[data.id] = [
          ...(subscriptions[data.id] || []).filter((p) => p !== port),
          port,
        ];
      }

      case "game:unsubscribe": {
        subscriptions[data.id] = (subscriptions[data.id] || []).filter(
          (p) => p !== port
        );
      }
    }
  });

  port.start();
};

export const a = 0;
