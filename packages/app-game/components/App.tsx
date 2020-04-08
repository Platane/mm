import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ConfigPage } from "./ConfigPage";
import { Game } from "./Game";
import { useGameConfig } from "./_hooks/useGameConfig";
import { useRouter } from "./_hooks/useRouter";

export const App = () => {
  const { page, setPage } = useRouter();
  const { p, n, setGameConfig } = useGameConfig();

  return (
    <>
      <Content p={p} n={n} setGameConfig={setGameConfig} page={page} />
      <Footer>
        {page !== "game" && (
          <a href="#" onClick={() => setPage("game")}>
            <label>game</label>
          </a>
        )}
        {page !== "config" && (
          <a href="#" onClick={() => setPage("config")}>
            <label>config</label>
          </a>
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
