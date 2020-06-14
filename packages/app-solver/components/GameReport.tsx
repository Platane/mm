import styled from "@emotion/styled";
import { useTranslate } from "./_hooks/useTranslate";
import { InputNumber } from "@mm/app-game/components/InputNumber";
import { FeedbackBox } from "@mm/app-game/components/Board/FeedbackBox";
import { Button } from "./Button";
import type { Feedback } from "@mm/solver/type";
import { Separator } from "@mm/app-game/components/Separator";

type Props = {
  n: number;
  feedback: Feedback;
  setFeedback: (f: Feedback) => void;
  onSubmit: () => void;
};

export const GameReport = ({ n, feedback, setFeedback, onSubmit }: Props) => {
  const { t } = useTranslate();

  return (
    <FormContainer
      style={{ width: "100%" }}
      onSubmit={(e) => {
        e.preventDefault();
        setFeedback({ correct: 0, badPosition: 0 });
        onSubmit();
      }}
    >
      <label>{t("write_the_result")}</label>

      <FeedbackBox_ pegSize={38} feedback={feedback} n={n} disableAnimation />

      <Row>
        <label>{t("correct_position")}</label>
        <InputNumber
          min={0}
          max={n}
          value={feedback.correct}
          onChange={(correct: number) =>
            setFeedback({
              badPosition: Math.min(feedback.badPosition, n - correct),
              correct,
            })
          }
        />
      </Row>

      <Row>
        <label>{t("bad_position")}</label>
        <InputNumber
          min={0}
          max={n}
          value={feedback.badPosition}
          onChange={(badPosition: number) =>
            setFeedback({
              correct: Math.min(feedback.correct, n - badPosition),
              badPosition,
            })
          }
        />
      </Row>

      <Separator />

      <Button type="submit">{t("ok")}</Button>
    </FormContainer>
  );
};
const FormContainer = styled.form``;

const FeedbackBox_ = styled(FeedbackBox)`
  height: 200px;
  width: 200px;
  max-width: none;
  transform: rotateY(5deg) rotateX(10deg);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  justify-content: space-between;
  align-items: center;
`;
