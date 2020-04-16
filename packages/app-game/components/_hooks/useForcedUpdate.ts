import { useState } from "react";

export const useForcedUpdate = () => {
  const [k, setK] = useState(1);
  return () => {
    setK((k) => k + 1);
  };
};
