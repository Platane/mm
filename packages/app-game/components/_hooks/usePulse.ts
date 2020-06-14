import { useEffect, useState, useRef } from "react";

export const usePulse = <T>(key: T, delay = 0, pulse0 = true) => {
  const [futureKey, setFuturekey] = useState(pulse0 ? null : key);
  const ref = useRef(key);

  ref.current = key;

  useEffect(() => {
    if (!key === undefined || key === null) return;

    const timeout = setTimeout(() => setFuturekey(key), delay);

    return () => clearTimeout(timeout);
  }, [key]);

  if (futureKey === ref.current) return null;

  return ref.current;
};
