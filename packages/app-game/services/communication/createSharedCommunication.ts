// @ts-ignore
import workerUrl from "worker-plugin/dist/loader!./communication-worker";
import { generateId } from "@mm/utils/generateId";

export const createSharedCommunication = (
  onMessage?: (message: { type: string }) => void
) => {
  const clientId = generateId();

  // @ts-ignore
  if (typeof SharedWorker === "undefined")
    return { clientId, dispose: () => {}, publish: () => {} };

  // @ts-ignore
  const worker = new SharedWorker(workerUrl);

  worker.onError = console.error;

  const publish = (message: { type: string } & any) => {
    worker.port.postMessage({ ...message, clientId });
  };

  const handle = ({ data }: any) => {
    if (onMessage && data && data.type && data.clientId !== clientId)
      onMessage(data);
  };

  worker.port.addEventListener("message", handle);
  worker.port.start();

  worker.port.postMessage({ type: "hello", clientId });

  const dispose = () => {
    worker.port.close();
    worker.port.removeEventListener("message", handle);
  };

  return { clientId, dispose, publish };
};
