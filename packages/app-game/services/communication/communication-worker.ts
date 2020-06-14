import { Session } from "./session";

const ports: any[] = [];

const sessions: Record<string, Session> = {};

// @ts-ignore
self.onconnect = ({ ports: [port] }) => {
  ports.push(port);

  port.addEventListener("message", ({ data }: { data: any }) => {
    if (data.type === "session:updated") {
      const sessionId = data.clientId;
      const date = (sessions[sessionId] || { date: Date.now() }).date;
      sessions[sessionId] = { ...data.session, sessionId, date };
    }

    for (const p of ports.filter((p) => p !== port)) {
      p.postMessage(data);
    }
  });

  port.postMessage({ type: "session:list", sessions: Object.values(sessions) });

  port.start();
};
