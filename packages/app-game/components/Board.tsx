import styled from "@emotion/styled";
import { Row as IRow } from "@mm/solver/type";
import { Object3d } from "@mm/app-cheater/components/Object3d";
import { BoardRow } from "./BoardRow";
import { keyframes } from "@emotion/core";

export const Board = ({
  p,
  n,
  rows,
  candidate,
  onSubmit,
}: {
  p: number;
  n: number;
  rows: IRow[];
  candidate: (number | null)[];
  onSubmit?: () => void;
}) => {
  const m = 4;
  const dropZone = (
    <>
      {Array.from({ length: n }, (_, i) => (
        <div
          key={i}
          data-hit={
            candidate[i] === null
              ? `empty-${i}`
              : `candidate-${i}-${candidate[i]}`
          }
          style={{
            position: "absolute",
            borderRadius: "40%",
            top: `${m}px`,
            bottom: `${m}px`,
            width: `calc( ${100 / n}% - ${m * 2}px)`,
            left: `calc( ${m}px +  ${(i * 100) / n}% )`,
          }}
        />
      ))}

      {onSubmit && <Submit onClick={onSubmit}>submit</Submit>}
    </>
  );

  return (
    <Container>
      <SideLeft />
      <SideRight />
      <SideBottom />

      {rows.map((row, i) => (
        <BoardRow i={i} key={i} {...row} />
      ))}

      <BoardRow
        i={rows.length}
        key={rows.length}
        line={candidate}
        lineChildren={dropZone}
      />

      {Array.from({ length: Math.max(0, 7 - rows.length) }, (_, i) => (
        <BoardRow
          i={rows.length + i + 1}
          key={rows.length + i + 1}
          line={Array.from({ length: n }, () => null)}
        />
      ))}
    </Container>
  );
};

const boardColor = "#aaa";
const sideH = 50;
const Container = styled(Object3d)`
  width: calc(100% - 100px);
  max-width: 400px;
  min-width: 200px;

  display: flex;
  flex-direction: column-reverse;
  background-color: ${boardColor};

  position: relative;
`;
const SideLeft = styled(Object3d)`
  position: absolute;
  left: 1px;
  top: 0;
  bottom: 0;

  width: ${sideH}px;
  transform: rotateY(90deg);
  transform-origin: 0 0;

  background-color: ${boardColor};
  filter: brightness(1.1);
`;
const SideRight = styled(Object3d)`
  position: absolute;
  right: 1px;
  top: 0;
  bottom: 0;

  width: ${sideH}px;
  transform: rotateY(-90deg);
  transform-origin: 100% 0;

  background-color: ${boardColor};
  filter: brightness(1.1);
`;
const SideBottom = styled(Object3d)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 1px;

  height: 50px;
  transform: rotateX(90deg);
  transform-origin: 0 100%;

  background-color: ${boardColor};
  filter: brightness(1.15);
`;

const submitAppear = keyframes`
  0%{ 
    transform: translate3d(-120px, 0, 2px) rotateX(-26deg) scale(0.9);
    opacity: 0;
  }
  100%{ 
    transform: translate3d(0, 0, 2px) rotateX(-26deg);
    opacity: 1;
  }
`;

const Submit = styled.button`
  position: absolute;
  right: -70px;
  width: 70px;
  top: 0;
  bottom: 0;
  border: none;
  background: orange;
  padding: 10px;
  transform: translate3d(0, 0, 2px) rotateX(-26deg);
  transform-origin: 0 100%;
  animation: ${submitAppear} 180ms cubic-bezier(0.52, 0.58, 0.72, 1.53);
`;
