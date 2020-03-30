import { createContext, useState, useContext } from "react";

export const colorSchemes = [
  [
    ["#fce514", "#efda21"],
    ["#2678f4", "#2866c3"],
    ["#df2525", "#d02727"],
    ["#6acc14", "#60b516"],
    ["#bb18c6", "#ab1bb5"],
    ["#fba106", "#d6911a"],
  ],
];

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
  return { colorScheme: colorSchemes[0] };
};
