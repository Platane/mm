import { createContext, useState, useContext } from "react";
import { colorSchemes } from "../color";

const Context = createContext({
  colorScheme: [],
  setColorScheme: (colorScheme: string[]) => {},
  toggleColorScheme: () => {},
} as any);

const P = Context.Provider as any;

export const ColorSchemeProvider = ({ children }: any) => {
  return <P value={{}}>{children}</P>;
};

export const useColorScheme = () => {
  return { colors: colorSchemes[0] };
};
