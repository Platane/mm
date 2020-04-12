import { createContext, useContext } from "react";
import { useAppState as useAppState_ } from "./useAppState";

export const Context = createContext({} as ReturnType<typeof useAppState_>);

export const AppStateProvider = ({ children }: any) => {
  const ctx = useAppState_();

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

export const useAppState = () => useContext(Context);

export const useColorScheme = useAppState;
