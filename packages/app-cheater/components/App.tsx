import { useState } from "react";
import styled from "@emotion/styled";
import { Feedback } from "@mm/solver/type";
import { useSolver } from "./_hooks/useSolver";
import { Peg } from "../../app-game/components/Peg";

export const App = () => {
  const { candidate, computing, nextTurn } = useSolver(6, 4);

  const [feedback, setFeedback] = useState({
    correct: 0,
    badPosition: 0,
  } as Feedback);

  return (
    <Container>
      <Line>
        {computing && <span>computing ...</span>}
        {candidate &&
          candidate.map((peg, i) => (
            <Peg key={i} peg={peg} size={28} style={{ margin: "16px" }} />
          ))}
      </Line>
    </Container>
  );
};

const Container = styled.div``;
const Line = styled.div`
  transform-style: preserve-3d;
  transform: rotateX(45deg);
  display: flex;
  flex-direction: row;
`;
