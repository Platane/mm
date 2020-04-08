import { useEffect, useState } from "react";

export const usePulse = (key: any, delay = 0) => {
  const [pulse, setPulse] = useState(key);

  useEffect(() => {
    setPulse(key);

    if (!key === undefined || key === null) return;

    const timeout = setTimeout(() => setPulse(null), delay);

    return () => clearTimeout(timeout);
  }, [key]);

  return pulse;
};
