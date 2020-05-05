import { useEffect, useState } from "react";

export const useDelay = <T>(key: T, delay = 0) => {
  const [futureKey, setFuturekey] = useState(key);

  useEffect(() => {
    const timeout = setTimeout(() => setFuturekey(key), delay);

    return () => clearTimeout(timeout);
  }, [key]);

  return futureKey;
};
