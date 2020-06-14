import { generateId } from "@mm/utils/generateId";

type Port = any;

type Message = { type: string; key: string };

export const createHandler = (
  port: Port,
  handle: (m: { type: string } & any) => any
) => {
  port.addEventListener(
    "message",
    async ({ data: { key, ...message } }: { data: Message }) => {
      const res = await handle(message);

      port.postMessage({ type: message.type + "@res", key, res });
    }
  );
};

export const createRPC = (port: any, type: string) => (param?: any) =>
  new Promise((resolve, reject) => {
    const key = generateId();

    const handler = ({ data }: any) => {
      if (data && key === data.key) {
        port.removeEventListener("message", handler);

        if (data.error) reject(data.error);
        else resolve(data.res);
      }
    };

    port.addEventListener("message", handler);

    port.postMessage({ type, key, ...param });
  });
