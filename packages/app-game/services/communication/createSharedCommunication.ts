// @ts-ignore
import workerUrl from "worker-plugin/dist/loader!./communication-worker";
import { generateId } from "@mm/utils/generateId";

export const createSharedCommunication = (
  onMessage?: (message: { type: string }) => void
) => {
  console.log("createSharedCommunication");

  // @ts-ignore
  const worker = new SharedWorker(workerUrl);

  worker.onError = console.error;

  const clientId = generateId();

  const handle = ({ data }: any) => {
    console.log("received", data);
    if (onMessage && data && data.type && data.clientId !== clientId)
      onMessage(data);
  };

  const publish = (message: { type: string } & any) => {
    console.log("published", message);
    worker.port.postMessage({ ...message, clientId });
  };

  worker.port.start();
  worker.port.addEventListener("message", handle);

  worker.port.postMessage({ type: "hello", clientId });

  const dispose = () => {
    worker.port.close();
    worker.port.removeEventListener("message", handle);
  };

  return { clientId, dispose, publish };
};
