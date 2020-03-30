import styled from "@emotion/styled";
import { useGameConfig } from "@mm/app-cheater/components/_hooks/useGameConfig";
import { useCandidate } from "./_hooks/useCandidate";
import { useGame } from "./_hooks/useGame";
import { Board } from "./Board";
import { useEffect } from "react";
import { getRandomLine } from "@mm/solver/getRandomtLine";
import { keyframes } from "@emotion/core";
import { Object3d } from "@mm/app-cheater/components/Object3d";
import { Line } from "@mm/solver/type";
import { FlyingPegManager } from "./FlyingPegManager";

export const App = () => {
  const { p, n } = useGameConfig();
  const { id, rows, playLine, reset: resetGame } = useGame(p, n);
  const {
    candidate,
    temporaryCandidate,
    onHover,
    onDrop,
    reset: resetCandidate,
  } = useCandidate(n);

  console.log(temporaryCandidate);

  useEffect(() => {
    resetCandidate();
    resetGame();

    for (let k = 4; k--; ) playLine(getRandomLine(p, n));
  }, [p, n]);

  const onSubmit = () => {
    if (!candidate.every((x) => x !== null)) return;
    playLine(candidate as Line);
    resetCandidate();
  };

  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          data-hit={`source-${i}`}
          style={{
            width: "150px",
            height: "20px",
            background: `hsl(${i * 50 + 30}deg,60%,60%)`,
          }}
        />
      ))}

      <World>
        <Scene>
          <Board
            n={n}
            p={p}
            rows={rows}
            candidate={temporaryCandidate}
            onSubmit={candidate.every((p) => p !== null) ? onSubmit : undefined}
          />
        </Scene>
      </World>

      <FlyingPegManager onHover={onHover} onDrop={onDrop} />
    </>
  );
};

/*
 */

const World = styled.div`
  perspective: 1000px;
`;

const wobble = keyframes`
0%{ transform: rotateY(20deg) rotateX(35deg) }
50%{ transform: rotateY(-10deg) rotateX(35deg) }
100%{ transform: rotateY(20deg) rotateX(35deg) }
`;
const Scene = styled(Object3d)`
  // animation: ${wobble} 2000ms linear infinite;
  transform: rotateY(10deg) rotateX(35deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;
