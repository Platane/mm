import styled from "@emotion/styled";
import { ConfigPage } from "./ConfigPage";
import { Game } from "./Game";
import { Separator } from "./Separator";
import { useAppState } from "../services/appState/useAppState";
import { GithubLogo } from "./GithubLogo";

export const App = () => {
  const { page, setPage, reset, ...ctx } = useAppState();

  return (
    <>
      <ContentContainer>
        <Content page={page} setPage={setPage} {...ctx} />
      </ContentContainer>
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
        <Separator />
        <a title="github" href="https://github.com/platane/mm">
          <GithubLogo style={{ width: "16px", height: "16px", fill: "#111" }} />
        </a>
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  height: 100%;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  right: 16px;
  padding: 4px;
`;
