import { createSharedCommunication } from "./createSharedCommunication";
import { useEffect, useState } from "react";

export const useSharedCommunication = (
  onMessage: (message?: { type: string }) => void
) => {
  const [com, setCom] = useState<ReturnType<typeof createSharedCommunication>>({
    publish: () => {},
  } as any);

  useEffect(() => {
    const c = createSharedCommunication(onMessage);
    setCom(c);
    return () => c.dispose();
  }, [onMessage]);

  return com;
};
