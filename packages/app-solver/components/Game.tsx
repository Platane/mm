import { useState } from "react";
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

export const Game = ({
  p,
  n,
  initialRows,
}: {
  p: number;
  n: number;
  initialRows: IRow[];
}) => {
  const [step, setStep] = useState<"play" | "feedback">("play");
  const { t } = useTranslate();

  const { candidate, computing, nextTurn, rows } = useSolver(p, n, initialRows);

  const [feedback, setFeedback] = useState<Feedback>({
    correct: 0,
    badPosition: 0,
  });

  return (
    <Container>
      {step === "play" && (
        <Content_>
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!computing) setStep("feedback");
            }}
          >
            <label>{t("play_this_line")}</label>
            <Line>
              {computing && <span>computing ...</span>}
              {candidate &&
                candidate.map((peg, i) => (
                  <Peg key={i} peg={peg} size={28} style={{ margin: "16px" }} />
                ))}
            </Line>

            <Button type="submit">
              <label style={{ pointerEvents: "none" }}>{t("ok")}</label>
            </Button>
          </form>
        </Content_>
      )}

      {step === "feedback" && (
        <Content_>
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              nextTurn(candidate as number[], feedback);
              setStep("play");
              setFeedback({ correct: 0, badPosition: 0 });
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
          rows={
            step === "feedback"
              ? [...rows, { line: candidate as any, feedback }]
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
  min-width: 110px;
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
  width: 200px;
  transform: scale(0.5);
`;

const Line = styled(Object3d)`
  transform-style: preserve-3d;
  transform: rotateX(45deg);
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  border: none;
  background: orange;
  padding: 10px;
  border-radius: 4px;
`;
