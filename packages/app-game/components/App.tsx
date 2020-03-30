import styled from "@emotion/styled";
import { useGameConfig } from "@mm/app-cheater/components/_hooks/useGameConfig";
import { useGame } from "./_hooks/useGame";
import { Board } from "./Board";
import { useState, useEffect } from "react";
import { getRandomLine } from "@mm/solver/getRandomtLine";
import { keyframes } from "@emotion/core";
import { Object3d } from "@mm/app-cheater/components/Object3d";
import { Line } from "@mm/solver/type";
import { FlyingPegManager } from "./FlyingPegManager";

export const App = () => {
  const { p, n } = useGameConfig();
  const { id, rows, playLine, reset } = useGame(p, n);
  const [candidate, setCandidate] = useState<(number | null)[]>([]);

  useEffect(() => {
    setCandidate(Array.from({ length: n }, () => null));
    reset();

    for (let k = 4; k--; ) playLine(getRandomLine(p, n));
  }, [p, n]);

  const submit = () => {
    if (!candidate.every((x) => x !== null)) return;

    playLine(candidate as Line);
    setCandidate(Array.from({ length: n }, () => null));
  };

  return (
    <>
      <World>
        <div
          data-hit="source-1"
          style={{ width: "100px", height: "100px", background: "red" }}
        />

        <Scene>
          <Board rows={rows} candidate={candidate} n={n} p={p} />
        </Scene>
      </World>

      <FlyingPegManager />
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
