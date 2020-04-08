import { createContext, useState, useContext } from "react";

const context = createContext({
  p: 6,
  n: 4,

  setGameConfig: (_p: number, _n: number) => {},
});

const P = context.Provider as any;

export const GameConfigProvider = ({ children }: any) => {
  const [config, setConfig] = useState({ p: 6, n: 4 });
  const setGameConfig = (p: number, n: number) => setConfig({ p, n });

  return <P value={{ ...config, setGameConfig }}>{children}</P>;
};

export const useGameConfig = () => useContext(context);
