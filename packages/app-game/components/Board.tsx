import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Row as IRow } from "@mm/solver/type";
import { Object3d } from "./Object3d";
import { BoardRow } from "./BoardRow";
import { boardColor } from "./theme";
import type { ColorScheme } from "../services/colorScheme";
import { BoardDropZone } from "./BoardDropZone";

export const Board = ({
  p,
  n,
  rows,
  candidate,
  colorScheme,
  disableAnimation = false,
  onSubmit,
  ...props
}: {
  p: number;
  n: number;
  rows: IRow[];
  colorScheme: ColorScheme;
  candidate: (number | null)[];
  disableAnimation?: boolean;
  onSubmit?: () => void;
  style?: any;
}) => {
  const dropZone = (
    <>
      <BoardDropZone n={n} candidate={candidate} />
      {onSubmit && <Submit onClick={onSubmit}>submit</Submit>}
    </>
  );

  return (
    <Container {...props}>
      <SideLeft />
      {false && <SideRight />}
      <SideBottom />

      {rows.map((row, i) => (
        <BoardRow
          i={i}
          key={i}
          colorScheme={colorScheme}
          disableAnimation={disableAnimation}
          {...row}
        />
      ))}

      <BoardRow
        i={rows.length}
        key={rows.length}
        colorScheme={colorScheme}
        line={candidate}
        lineChildren={dropZone}
        disableAnimation={disableAnimation}
      />

      {Array.from({ length: Math.max(0, 7 - rows.length) }, (_, i) => (
        <BoardRow
          i={rows.length + i + 1}
          key={rows.length + i + 1}
          colorScheme={colorScheme}
          line={Array.from({ length: n }, () => null)}
        />
      ))}
    </Container>
  );
};

const sideH = 50;
const Container = styled(Object3d)`
  width: calc(100% - 100px);
  max-width: 400px;
  min-width: 200px;

  display: flex;
  flex-direction: column-reverse;
  background-color: ${boardColor};

  position: relative;

  transition: transform 180ms linear 500ms;
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
