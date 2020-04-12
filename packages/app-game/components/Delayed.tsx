import { useState, useEffect } from "react";

export const Delayed = ({ children, delay = 0 }: any) => {
  const [displayed, setDisplayed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("asas");
      setDisplayed(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return displayed ? children : null;
};
