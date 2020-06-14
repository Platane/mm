import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/core";
import { Object3d } from "../Object3d";
import { lineHeight, bigPegSize } from "./BoardRow";
import { Peg } from "../Peg";
import { getRandomLine } from "@mm/solver/getRandomtLine";
import { usePulse } from "../_hooks/usePulse";
import { boardColor } from "../theme";
import type { ColorScheme } from "../../services/colorScheme";
import type { Line } from "@mm/solver/type";

export const BoardSolution = ({
  n,
  p,
  solution,
  colorScheme,
  disableAnimation = false,
  shuffle = false,
  ...props
}: {
  n: number;
  p: number;
  colorScheme: ColorScheme;
  solution: Line | null;
  disableAnimation?: boolean;
  shuffle?: boolean;
}) => {
  const shuffleLine = useShuffleLine(p, n, shuffle);

  return (
    <Container {...props}>
      <Ground />

      {shuffleLine &&
        shuffleLine.map((l, i) => (
          <PoppingPeg key={i + ":" + l}>
            <Peg color={colorScheme[l]} size={bigPegSize} />
          </PoppingPeg>
        ))}

      {solution &&
        solution.map((l, i) => (
          <HappyPeg n={n} i={i} key={i}>
            <Peg color={colorScheme[l]} size={bigPegSize} />
          </HappyPeg>
        ))}

      <Cache
        disableAnimation={disableAnimation}
        reveal={!!solution || shuffle}
      />
    </Container>
  );
};

const useShuffleLine = (p: number, n: number, shuffle: boolean) => {
  const [shuffleLine, setShuffleLine] = useState(() => getRandomLine(p, n));

  const shufflePlus = usePulse(shuffle === false ? true : null, 200);

  useEffect(() => {
    if (!shuffle && !shufflePlus) return;

    let k = 0;

    let cancel = setInterval(() => {
      k++;
      setShuffleLine((line) =>
        line.map((l, i) =>
          i === k % line.length
            ? (l + Math.ceil(Math.random() * (p - 1))) % p
            : l
        )
      );
    }, 90);

    return () => clearTimeout(cancel);
  }, [shuffle || shufflePlus]);

  return shuffle || shufflePlus ? shuffleLine : null;
};

const Container = styled(Object3d)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${lineHeight + 20}px;
  margin: 0 auto;
  margin-bottom: 30px;
  max-width: 300px;
  width: 80%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
const Ground = styled.div`
  background-color: ${boardColor};
  filter: brightness(0.97);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const hide = keyframes`
0%{
  opacity: 0;
  transform: translateZ(280px) rotateX(-48deg);
}
50%{
  opacity: 1;
  transform: translateZ(1px) rotateX(-48deg) scale(1.07,0.93);
}
75%{
  opacity: 1;
  transform: translateZ(20px) rotateX(-48deg);
}
100%{
  opactity: 1;
  transform: translateZ(1px) rotateX(-48deg);
}
`;

const Cache = styled(Object3d)<{ reveal: boolean; disableAnimation: boolean }>`
  position: absolute;
  top: -2px;
  width: calc(100% - 2px);
  margin: 0 auto;
  height: ${lineHeight + 20}px;
  background-color: ${boardColor};
  filter: brightness(1.05);
  transform-origin: center bottom;

  ${(p) =>
    p.reveal
      ? css`
          opacity: 0;
          transform: translateZ(200px) rotateX(-48deg);
        `
      : css`
          opactity: 1;
          transform: translateZ(1px) rotateX(-48deg);
          animation: ${hide} 400ms linear;
        `};
`;

const pop = keyframes`
0% {
  transform: scale3d(1, 1,1 );
}
20% {
  transform: scale3d(0.9, 0.9, 0.9);
}

60% {
  transform: translateZ(26px) scale3d(1.25, 1.25, 0.8);
}

100% {
  transform: scale3d(1, 1,1 );
}
`;

const PoppingPeg = styled(Object3d)`
  animation: ${pop} 120ms linear;
`;

const happy: Record<number, any> = {};

const happyDuration = 200;
const createHappy = (n: number) => {
  const d = 1 / n;

  const keys = [
    `0% {
      transform: scale3d(1, 1,1 );
    }`,
    `${Math.round(100 * d * 0.3)}% {
      transform: scale3d(0.9, 0.9, 0.9);
    }`,
    `${Math.round(100 * d * 0.6)}% {
      transform: translateZ(26px) scale3d(1.25, 1.25, 0.8);
    }`,
    `${Math.round(100 * d)}% {
      transform: scale3d(1, 1,1 );
    }`,

    `100% {
      transform: scale3d(1, 1,1 );
    }`,
  ];

  return keyframes`${keys}`;
};

const HappyPeg = styled(Object3d)<{ n: number; i: number }>`
  animation: ${({ n }) => (happy[n] = happy[n] || createHappy(n))}
    ${(p) => p.n * happyDuration}ms linear Infinite;

  animation-delay: ${(p) => p.i * happyDuration}ms;
`;
