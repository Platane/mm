import { createContext, useState, useContext, useEffect } from "react";
import { useGameConfig } from "./useGameConfig";
import { colorSchemes } from "../theme";

const Context = createContext({
  colorScheme: [] as string[][],
  setColorScheme: (colorScheme: string[][]) => {},
});

const P = Context.Provider;

export const ColorSchemeProvider = ({ children }: any) => {
  const { p } = useGameConfig();

  const [colorScheme, setColorScheme] = useState<string[][]>(
    colorSchemes.find((cs) => cs.length === p) as string[][]
  );

  useEffect(() => {
    setColorScheme(colorSchemes.find((cs) => cs.length === p) as string[][]);
  }, [p]);

  return <P value={{ colorScheme, setColorScheme }}>{children}</P>;
};

export const useColorScheme = () => useContext(Context);
