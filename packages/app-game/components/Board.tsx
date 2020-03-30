import styled from "@emotion/styled";
import { Row as IRow } from "@mm/solver/type";
import { getRandomLine } from "@mm/solver/getRandomtLine";
import { Object3d } from "@mm/app-cheater/components/Object3d";
import { BoardRow } from "./BoardRow";

export const Board = ({
  p,
  n,
  rows,
  playLine,
  candidate,
}: {
  p: number;
  n: number;
  rows: IRow[];
  playLine: any;
  candidate: (number | null)[];
}) => {
  return (
    <Container onClick={() => playLine(getRandomLine(p, n))}>
      <SideLeft />
      <SideRight />
      <SideBottom />

      {Array.from({ length: Math.max(rows.length, 8) }).map((_, i) => (
        <BoardRow
          i={i}
          key={i}
          feedback={rows[i] && rows[i].feedback}
          line={rows[i] ? rows[i].line : Array.from({ length: n }, () => null)}
        />
      ))}
    </Container>
  );
};

const boardColor = "#aaa";
const sideH = 50;
const Container = styled(Object3d)`
  width: calc(100% - 50px);
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
