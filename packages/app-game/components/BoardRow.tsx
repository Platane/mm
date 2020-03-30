import styled from "@emotion/styled";
import { Peg } from "@mm/app-cheater/components/Peg";
import { Feedback } from "@mm/solver/type";
import { css } from "@emotion/core";
import { Object3d } from "@mm/app-cheater/components/Object3d";

const lineHeight = 60;
const bigPegSize = 30;
const smallPegSize = 14;

export const BoardRow = ({
  i,
  line,
  feedback,
}: {
  i: number | null;
  line: (number | null)[];
  feedback?: Feedback;
}) => (
  <Container>
    {i !== null && <Number>{i + 1}</Number>}

    <Line>
      {line.map((l, i) => (
        <Hole size={smallPegSize} key={i}>
          {l !== null && <Peg size={bigPegSize} peg={l} />}
        </Hole>
      ))}
    </Line>

    <FeedbackContainer n={line.length}>
      {line.map((_, i) => {
        let content = null;

        if (feedback && i < feedback.correct)
          content = <Peg size={smallPegSize} peg="correct" />;
        else if (feedback && i < feedback.correct + feedback.badPosition)
          content = <Peg size={smallPegSize} peg="badPosition" />;

        return (
          <Hole size={smallPegSize} key={i}>
            {content}
          </Hole>
        );
      })}
    </FeedbackContainer>
  </Container>
);

const Hole = styled(Object3d)<{ size: number }>`
  width: ${(p) => p.size * 0.6}px;
  height: ${(p) => p.size * 0.6}px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.1);
`;

const Number = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${lineHeight}px;
  font-size: ${lineHeight * 0.6}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Helvetica, Arial;
  pointer-events: none;
  user-select: none;

  color: rgba(0, 0, 0, 0.1) !important;
`;

const Container = styled(Object3d)`
  position;relative;
  display: flex;
  flex-direction: row;

  &:nth-of-type(2n) {
    background-color: transparent;
  }
  &:nth-of-type(2n + 1) {
    background-color: #9c9c9c;
  }
`;

const Line = styled(Object3d)`
  display: flex;
  flex-direction: row;
  flex: auto 1 0;
  justify-content: space-evenly;
  align-items: center;
  transform-style: preserve-3d;
  height: ${lineHeight}px;
`;

const FeedbackContainer = styled(Object3d)<{ n: number }>`
  
  
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