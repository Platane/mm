import { createContext, useState, useContext } from "react";
import { colors, ColorName } from "../color";

const Context = createContext({
  colorName: "fourColors" as ColorName,
  setColorScheme: (_colorName: ColorName) => {},
  toggleColorScheme: () => {},
});

const P = Context.Provider as any;

export const ColorSchemeProvider = ({ children }: any) => {
  const [colorName, setColorName] = useState("fourColors" as ColorName);
  const setColorScheme = setColorName;
  const toggleColorScheme = () =>
    setColorName((cn) => (cn === "fourColors" ? "sixColors" : "fourColors"));

  return (
    <P value={{ colorName, toggleColorScheme, setColorScheme }}>{children}</P>
  );
};

export const useColorScheme = () => {
  const { colorName, toggleColorScheme } = useContext(Context);

  return { colorName, colors: colors[colorName], toggleColorScheme };
};
