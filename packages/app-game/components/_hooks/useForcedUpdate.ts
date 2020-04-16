import { useState } from "react";

export const useForcedUpdate = () => {
  const [, setK] = useState(1);
  return () => {
    setK((k) => k + 1);
  };
};
