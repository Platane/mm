import styled from "@emotion/styled";
import { ConfigPage } from "./ConfigPage";
import { Game } from "./Game";
import { Separator } from "./Separator";
import { useAppState } from "../services/appState/useAppState";

export const App = () => {
  const { page, setPage, reset, ...ctx } = useAppState();

  return (
    <>
      <Content page={page} {...ctx} />
      <Footer>
        {page === "game" && (
          <>
            <Separator />
            <a href="/solver" target="_blank">
              <label>open solver</label>
            </a>
          </>
        )}
        {page !== "game" && (
          <>
            <Separator />
            <a href="#" onClick={() => setPage("game")}>
              <label>game</label>
            </a>
          </>
        )}
        {page !== "onboarding" && page !== "config" && (
          <>
            <Separator />
            <a href="#" onClick={() => setPage("config")}>
              <label>config</label>
            </a>
          </>
        )}
        {page === "game" && (
          <>
            <Separator />
            <a href="#" onClick={reset}>
              <label>reset</label>
            </a>
          </>
        )}
      </Footer>
    </>
  );
};

const Content = ({ page, ...props }: any) => {
  switch (page) {
    case "game":
      return <Game {...props} />;
    case "config":
      return <ConfigPage {...props} />;
    case "onboarding":
      return <ConfigPage onboarding {...props} />;
    default:
      return null;
  }
};

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 4px;
`;
