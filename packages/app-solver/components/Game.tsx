import { useState } from "react";
import styled from "@emotion/styled";
import { Content, Container } from "./Layout";
import { Board } from "@mm/app-game/components/Board";
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
    <Container>
      {page === "game-instruction" && (
        <Content_>
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
        <Content_>
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

      <BoardPlaceholder />

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
        />
      </BoardContainer>
    </Container>
  );
};

const BoardPlaceholder = styled.div`
  flex: auto 0 1;
  width: 140px;
  height: 80px;
`;

const Content_ = styled(Content)``;
const BoardContainer = styled.div`
  min-width: 150px;
  width: calc(50% - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  top: 0;
  height: 80%;
  pointer-events: none;
`;

const SmallBoard = styled(Board)`
  width: 280px;
  transform: scale(0.5);
`;
