import { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
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

  const newLinePulse = usePulse(game.id + "-" + game.rows.length, 300);

  return (
    <FlyingPegManager
      colorScheme={colorScheme}
      onTemporaryMutationsChange={setTemporaryMutations}
      onChange={(m) => setCandidate((c) => applyMutation(c, m))}
    >
      <World pop={newLinePulse}>
        <Scene>
          <PegPools
            colorScheme={colorScheme}
            p={p}
            disabled={temporaryMutations.length > 0}
          />

          <Board
            n={n}
            p={p}
            rows={game.rows}
            colorScheme={colorScheme}
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
    </FlyingPegManager>
  );
};

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
  transform: rotateY(10deg) rotateX(35deg);
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
`;
