import { createContext, useState, useContext } from "react";

const context = createContext({
  n: 4,
  p: 6,

  setGameConfig: (n: number, p: number) => {},
});

const P = context.Provider as any;

export const GameConfigProvider = ({ children }: any) => {
  const [config, setConfig] = useState({ n: 4, p: 6 });
  const setGameConfig = (n: number, p: number) => setConfig({ n, p });

  return <P value={{ ...config, setGameConfig }}>{children}</P>;
};

export const useGameConfig = () => useContext(context);
