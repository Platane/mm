import styled from "@emotion/styled";
import { Feedback } from "@mm/solver/type";
import { Peg } from "./Peg";
import { Object3d } from "./Object3d";
import { FeedbackBox } from "./FeedbackBox";

const lineHeight = 60;
const bigPegSize = 28;
const smallPegSize = 14;

export const BoardRow = ({
  i,
  line,
  feedback,
  lineChildren,
  colorScheme,
  disableAnimation = false,
}: {
  i: number | null;
  line: (number | null)[];
  feedback?: Feedback;
  colorScheme: [string, string][];
  lineChildren?: any;
  disableAnimation?: boolean;
}) => (
  <Container>
    {i !== null && <Number>{i + 1}</Number>}

    <Line>
      {line.map((l, i) => (
        <Hole size={smallPegSize} key={i}>
          {l !== null && <Peg color={colorScheme[l]} size={bigPegSize} />}
        </Hole>
      ))}
      {lineChildren}
    </Line>

    <FeedbackBox
      n={line.length}
      feedback={feedback}
      pegSize={smallPegSize}
      disableAnimation={disableAnimation}
    />
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
  display: flex;
  position;relative;
  flex-direction: row;

  &:nth-of-type(2n) {
    background-color: transparent;
  }
  &:nth-of-type(2n + 1) {
    background-color: #9c9c9c;
  }
`;

const Line = styled(Object3d)`
  position;relative;
  display: flex;
  flex-direction: row;
  flex: auto 1 0;
  justify-content: space-around;
  align-items: center;
  transform-style: preserve-3d;
  height: ${lineHeight}px;
`;
