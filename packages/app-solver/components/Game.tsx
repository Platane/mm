import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Feedback, Row as IRow } from "@mm/solver/type";
import { useSolver } from "./_hooks/useSolver";
import { Peg } from "@mm/app-game/components/Peg";
import { useTranslate } from "./_hooks/useTranslate";
import { InputNumber } from "@mm/app-game/components/InputNumber";
import { FeedbackBox } from "@mm/app-game/components/FeedbackBox";
import { Object3d } from "@mm/app-game/components/Object3d";
import { Content, Container } from "./Layout";
import { Board } from "@mm/app-game/components/Board";
import { useAppState } from "../services/appState/useAppState";
import { Delayed } from "@mm/app-game/components/Delayed";

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

  const { candidate, computing, nextTurn, rows } = useSolver(p, n, game.rows);

  useEffect(() => {
    if (game.rows.length > rows.length) {
      const { line, feedback } = game.rows[rows.length];
      nextTurn(line, feedback);
    }
  }, [game.rows.length > rows.length]);

  const [feedback, setFeedback] = useState<Feedback>({
    correct: 0,
    badPosition: 0,
  });

  return (
    <Container>
      {page === "game-instruction" && (
        <Content_>
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              if (candidate) play(candidate);
            }}
          >
            <label>{t("play_this_line")}</label>
            <Line>
              {computing && (
                <Delayed delay={200}>
                  <label>computing ...</label>
                </Delayed>
              )}
              {candidate &&
                candidate.map((peg, i) => (
                  <Peg
                    key={i}
                    color={colorScheme[peg]}
                    size={28}
                    style={{ margin: "16px" }}
                  />
                ))}
            </Line>

            {candidate && (
              <Button type="submit">
                <label style={{ pointerEvents: "none" }}>{t("ok")}</label>
              </Button>
            )}
          </form>
        </Content_>
      )}

      {page === "game-report" && (
        <Content_>
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              if (candidate) {
                nextTurn(candidate, feedback);
                report(candidate, feedback);
                setFeedback({ correct: 0, badPosition: 0 });
              }
            }}
          >
            <label>{t("write_the_result")}</label>

            <FeedbackBox_
              pegSize={38}
              feedback={feedback}
              n={n}
              disableAnimation
            />

            <Row>
              <label>{t("correct_position")}</label>
              <InputNumber
                min={0}
                max={4}
                value={feedback.correct}
                onChange={(correct: number) =>
                  setFeedback((f) => ({
                    badPosition: Math.min(f.badPosition, 4 - correct),
                    correct,
                  }))
                }
              />
            </Row>

            <Row>
              <label>{t("bad_position")}</label>
              <InputNumber
                min={0}
                max={4}
                value={feedback.badPosition}
                onChange={(badPosition: number) =>
                  setFeedback((f) => ({
                    correct: Math.min(f.correct, 4 - badPosition),
                    badPosition,
                  }))
                }
              />
            </Row>

            <Button type="submit">
              <label style={{ pointerEvents: "none" }}>{t("ok")}</label>
            </Button>
          </form>
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
              ? [...rows, { line: candidate, feedback }]
              : rows
          }
          candidate={Array.from({ length: n }, () => null)}
          disableAnimation
        />
      </BoardContainer>
    </Container>
  );
};

const FeedbackBox_ = styled(FeedbackBox)`
  height: 200px;
  width: 200px;
  max-width: none;
  transform: rotateY(5deg) rotateX(10deg);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const BoardPlaceholder = styled.div`
  flex: auto 0 1;
  width: 80px;
  height: 80px;
`;

const Content_ = styled(Content)``;
const BoardContainer = styled.div`
  min-width: 130px;
  width: calc(50% - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  top: 0;
  height: 80%;
`;

const SmallBoard = styled(Board)`
  width: 240px;
  transform: scale(0.5);
`;

const Line = styled(Object3d)`
  transform-style: preserve-3d;
  transform: rotateX(45deg);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
`;
const Button = styled.button`
  border: none;
  background: orange;
  padding: 10px;
  border-radius: 4px;
`;
