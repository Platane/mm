import { useState, createContext, useContext } from "react";

type Page = "game" | "config" | "onboarding";

const Context = createContext({
  page: "onboarding" as Page,
  setPage: (_page: Page) => {},
});

const P = Context.Provider;

export const RouterProvider = ({ children }: any) => {
  const [page, setPage] = useState<Page>("onboarding");

  return <P value={{ page, setPage }}>{children}</P>;
};

export const useRouter = () => useContext(Context);
