import { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Content, Container } from "./Layout";
import { Board } from "@mm/app-game/components/Board/Board";
import { useAppState } from "../services/appState/useAppState";
import { Delayed } from "@mm/app-game/components/Delayed";
import { GameSolution } from "./GameSolution";
import { GameReport } from "./GameReport";
import { useTranslate } from "./_hooks/useTranslate";
import { useSolver } from "./_hooks/useSolver";
import type { Feedback } from "@mm/solver/type";

export const Game = ({
  p,
  n,
  game,
  colorScheme,
  page,
  play,
  report,
}: Omit<ReturnType<typeof useAppState>, "setPage">) => {
  const { t } = useTranslate();

  const { candidate, computing } = useSolver(p, n, game.rows);

  const [feedback, setFeedback] = useState<Feedback>({
    correct: 0,
    badPosition: 0,
  });

  return (
    <Container_>
      <BlockBefore />

      {page === "game-instruction" && (
        <Content_ key={page}>
          {candidate && (
            <GameSolution
              p={p}
              n={n}
              candidate={candidate}
              colorScheme={colorScheme}
              onSubmit={() => play(candidate)}
            />
          )}

          {computing && (
            <Delayed delay={200}>
              <label>{t("computing")}</label>
            </Delayed>
          )}

          {!computing && !candidate && (
            <label>{t("error_no_suitable_solution")}</label>
          )}
        </Content_>
      )}

      {page === "game-report" && (
        <Content_ key={page}>
          <Delayed delay={50}>
            <GameReport
              n={n}
              feedback={feedback}
              setFeedback={setFeedback}
              onSubmit={() => {
                if (candidate) {
                  report(candidate, feedback);
                }
              }}
            />
          </Delayed>
        </Content_>
      )}

      <BlockAfter>
        <BoardContainer>
          <SmallBoard
            p={p}
            n={n}
            colorScheme={colorScheme}
            rows={
              page === "game-report" && candidate
                ? [...game.rows, { line: candidate, feedback }]
                : game.rows
            }
            candidate={Array.from({ length: n }, () => null)}
            disableAnimation
            disableSolution
            solution={null}
          />
        </BoardContainer>
      </BlockAfter>
    </Container_>
  );
};

const mobile = `(max-width: 380px)`;

const BlockBefore = styled.div`
  flex: auto 1 1;
  width: auto;
`;
const BlockAfter = styled.div`
  width: auto;
  margin: 8px;
  flex: auto 0.72 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${mobile} {
    flex: auto 0 0;
    align-self: flex-end;
  }
`;

const appear = keyframes`
0% { opacity:0;}
70% { opacity:0;}
100% { opacity:1;}
`;

const Content_ = styled(Content)`
  animation: ${appear} 200ms ease;
  margin: 0;
  max-width: 360px;
  width: 100%;
`;
const Container_ = styled(Container)`
  @media ${mobile} {
    flex-direction: column-reverse;
  }
`;
const BoardContainer = styled.div`
  width: 140px;
  height: 240px;
`;

const SmallBoard = styled(Board)`
  transform-origin: 0 0;
  width: 280px;
  transform: scale(0.5);
  pointer-events: none;
`;
