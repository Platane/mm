import type { Row } from "@mm/solver/type";
import type { Action } from "../appState/reducer";
import { createHandler } from "./utils";

type Port = any;
type Session = {
  id: string;
  rows: Row[];
  m: number;
  p: number;
  colorScheme: string[][];
  date: number;

  master: Port;
  subscriptions: Port[];
};

const sessions: Record<string, Session> = {};

const format = (s: Session | undefined) => {
  if (!s) return undefined;
  const { master, subscriptions, ...game } = s;
  return game;
};

export type Message =
  | ((
      | {
          type: "game:set";
          rows: Row[];
          m: number;
          p: number;
          colorScheme: string[][];
        }
      | { type: "game:get" }
      | { type: "subscribe" }
      | { type: "unsubscribe" }
      | Extract<
          Action,
          { type: "game:play" | "game:reset" | "colorScheme:set" }
        >
    ) & { id: string })
  | { type: "game:list" };

// @ts-ignore
self.onconnect = (e) => {
  const [port] = e.ports;

  createHandler(port, (message: Message) => {
    switch (message.type) {
      case "game:get": {
        return format(sessions[message.id]);
      }
      case "game:list": {
        return Object.values(sessions).map(format).filter(Boolean);
      }

      case "game:set": {
        const session = (sessions[message.id] = {
          subscriptions: [],
          master: port,
          ...sessions[message.id],
          ...message,
        });

        for (const p of session.subscriptions) {
          p.postMessage({ type: "game:get@res", ...format(session) });
        }
        return;
      }

      case "game:play":
      case "game:reset":
      case "colorScheme:set": {
        const session = sessions[message.id];
        if (session) session.master.postMessage(message);
        return;
      }

      case "subscribe": {
        const session = sessions[message.id];
        if (session) session.subscriptions.push(port);
        return;
      }
      case "unsubscribe": {
        const session = sessions[message.id];
        if (session)
          session.subscriptions = session.subscriptions.filter(
            (p) => p !== port
          );
        return;
      }
    }
  });

  port.start();
};
