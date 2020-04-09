import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";
import { Feedback } from "@mm/solver/type";
import { Peg } from "./Peg";
import { Object3d } from "./Object3d";

const lineHeight = 60;

export const FeedbackBox = ({
  n,
  pegSize,
  feedback,
  disableAnimation = false,
  ...props
}: {
  n: number;
  pegSize: number;
  feedback?: Feedback;
  disableAnimation?: boolean;
}) => (
  <Container n={n} {...props}>
    {Array.from({ length: n }).map((_, i) => {
      let content = null;

      if (feedback && i < feedback.correct)
        content = (
          <FeedbackPeg
            size={pegSize}
            disableAnimation={disableAnimation}
            peg="correct"
          />
        );
      else if (feedback && i < feedback.correct + feedback.badPosition)
        content = (
          <FeedbackPeg
            size={pegSize}
            disableAnimation={disableAnimation}
            peg="badPosition"
          />
        );

      return (
        <Hole size={pegSize} key={i}>
          {content}
        </Hole>
      );
    })}
  </Container>
);

const Hole = styled(Object3d)<{ size: number }>`
  width: ${(p) => p.size * 0.6}px;
  height: ${(p) => p.size * 0.6}px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.04);

  pointer-events: none;
`;

const Container = styled(Object3d)<{ n: number }>`
  padding: 6px;
  flex: auto 0.5 0;
  display: grid;
  justify-items: center;
  align-items: center;

  ${(p) => {
    const x = Math.ceil(Math.sqrt(p.n));
    const y = Math.ceil(p.n / x);

    return css`
      max-width: ${(lineHeight / y) * x * 1.2}px;

      grid-template-columns: ${`${100 / x}% `.repeat(x)};
      grid-template-row: ${`${100 / y}% `.repeat(y)};
    `;
  }}}
`;

const dropAnimation = keyframes`
  0%{ transform: translateZ(100px) scale(0) }
  80%{ transform: translateZ(100px) scale(0) }
  81%{ transform: translateZ(100px) scale(0.5) }
  90%{ transform: translateZ(60px) scale(1) }
  100%{ transform: translateZ(0px) }
`;
const FeedbackPeg = styled(Peg)<{ disableAnimation: boolean }>`
  animation: ${(p) => (p.disableAnimation ? "" : dropAnimation)} 420ms linear;
`;
