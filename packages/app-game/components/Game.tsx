import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Line } from "@mm/solver/type";
import { usePulse } from "./_hooks/usePulse";
import { Object3d } from "./Object3d";
import { useCandidate } from "./_hooks/useCandidate";
import { useGame } from "./_hooks/useGame";
import { Board } from "./Board";
import { FlyingPegManager } from "./FlyingPegManager";
import { PegPools } from "./PegPools";

export const Game = ({ p, n }: { p: number; n: number }) => {
  const { id, rows, playLine, reset: resetGame } = useGame(p, n);
  const {
    candidate,
    temporaryCandidate,
    onHover,
    onDrop,
    reset: resetCandidate,
  } = useCandidate(n);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    resetCandidate();
    resetGame();
  }, [p, n]);

  const onSubmit = () => {
    if (!candidate.every((x) => x !== null)) return;
    playLine(candidate as Line);
    resetCandidate();
  };

  const newLinePulse = usePulse(id + "-" + rows.length, 300);

  return (
    <>
      <World pop={newLinePulse}>
        <Scene>
          <PegPools p={p} disabled={hover} />

          <Board
            n={n}
            p={p}
            rows={rows}
            candidate={temporaryCandidate}
            onSubmit={candidate.every((p) => p !== null) ? onSubmit : undefined}
            // style={{
            //   transform: `translateY(${Math.max(
            //     rows.length * 80 - 200,
            //     -80
            //   )}px)`,
            // }}
          />
        </Scene>
      </World>

      <FlyingPegManager
        onHover={(id, a, b) => {
          onHover(id, a, b);
          setHover(true);
        }}
        onDrop={(id, a, b) => {
          onDrop(id, a, b);
          setHover(false);
        }}
      />
    </>
  );
};

/*
 */

const wobble = keyframes`
 0%{ transform: rotateY(20deg) rotateX(35deg) }
 50%{ transform: rotateY(-10deg) rotateX(35deg) }
 100%{ transform: rotateY(20deg) rotateX(35deg) }
 `;

const popAnimation = keyframes`
  0%{ transform: scale(1) }
  40%{ transform: scale(1.1) }
  100%{ transform: scale(1) }
 `;

const World = styled.div<{ pop: boolean }>`
  perspective: 1000px;
  animation: ${(p) => (p.pop ? popAnimation : "none")} 220ms linear;
`;

const Scene = styled(Object3d)`
  // animation: ${wobble} 2000ms linear infinite;
  transform: rotateY(10deg) rotateX(35deg);
  display: flex;
  justify-content: center;
  align-items: center;
`;
