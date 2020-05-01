import { useState } from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/core";
import { Line } from "@mm/solver/type";
import { usePulse } from "./_hooks/usePulse";
import { Object3d } from "./Object3d";
import { Board } from "./Board";
import { PegPools } from "./PegPools";
import { useAppState } from "../services/appState/useAppState";
import { FlyingPegManager } from "./FlyingPeg/FlyingPegManager";

type Candidate = (number | null)[];
type Mutation = {
  origin: { peg: number; k?: number };
  destination?: { k?: number };
};

const applyMutation = (
  candidate: Candidate,
  mutation: Mutation,
  applyDestination = true
) =>
  candidate.map((u, k) => {
    if (
      mutation.destination &&
      mutation.destination.k === k &&
      applyDestination
    )
      return mutation.origin.peg;

    if (mutation.destination && mutation.destination.k === k && u !== null)
      return null;

    if (mutation.origin.k === k) return null;

    return u;
  });

export const Game = ({
  n,
  p,
  game,
  play,
  colorScheme,
}: ReturnType<typeof useAppState>) => {
  const [temporaryMutations, setTemporaryMutations] = useState<Mutation[]>([]);
  const [candidate, setCandidate] = useState<Candidate>(
    Array.from({ length: n }, () => null)
  );

  const onSubmit = () => {
    play(candidate as Line);
    setCandidate(Array.from({ length: n }, () => null));
  };

  const temporaryCandidate = temporaryMutations.reduce(
    (c, m) => applyMutation(c, m, false),
    candidate
  );

  const win = game.rows.some(({ feedback }) => feedback.correct === n);

  const newLinePulse = !!usePulse(game.id + "-" + game.rows.length, 300);
  const resetPulse = !!usePulse(game.id, 400, false);
  const shuffle = !!usePulse(game.id, 2600);

  return (
    <FlyingPegManager
      colorScheme={colorScheme}
      onTemporaryMutationsChange={setTemporaryMutations}
      onChange={(m) => setCandidate((c) => applyMutation(c, m))}
    >
      <World resetAnimation={resetPulse} popAnimation={newLinePulse}>
        <Scene>
          <PegPools
            colorScheme={colorScheme}
            p={p}
            disabled={temporaryMutations.length > 0}
          />

          <Board
            n={n}
            p={p}
            id={game.id}
            rows={game.rows}
            colorScheme={colorScheme}
            candidate={temporaryCandidate}
            solution={win ? game.solution : null}
            shuffle={shuffle}
            onSubmit={candidate.every((p) => p !== null) ? onSubmit : undefined}
          />
        </Scene>
      </World>
    </FlyingPegManager>
  );
};

const popAnimation = keyframes`
  0%{ transform: scale(1) }
  40%{ transform: scale(1.1) }
  100%{ transform: scale(1) }
 `;
const resetAnimation = keyframes`
  0%{ transform: rotateX(0deg) }
  28%{ transform:  rotateX(60deg) translateZ(-600px) }
  60%{ transform:  rotateX(-10deg) translateZ(-160px) scale(1,1) }
  75%{ transform:  rotateX(-12deg) translateZ(-180px) scale(1.13,1.06) }
  100%{ transform: rotateX(0deg) }
 `;

const World = styled(Object3d)<{
  popAnimation: boolean;
  resetAnimation: boolean;
}>`
  perspective: 1000px;
  ${(p) => {
    if (p.resetAnimation)
      return css`
        animation: ${resetAnimation} 330ms linear;
        transform-origin: center bottom;
      `;
    if (p.popAnimation)
      return css`
        animation: ${popAnimation} 230ms linear;
      `;
    return "";
  }}
`;

const Scene = styled(Object3d)`
  transform: rotateY(10deg) rotateX(35deg);
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
`;
