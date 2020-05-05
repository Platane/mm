import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Object3d } from "../Object3d";
import { BoardRow } from "./BoardRow";
import { boardColor } from "../theme";
import { BoardDropZone } from "./BoardDropZone";
import { BoardSolution } from "./BoardSolution";
import type { Row as IRow, Line } from "@mm/solver/type";
import type { ColorScheme } from "../../services/colorScheme";
import { titleFont } from "../typography";
import { useTranslate } from "../_hooks/useTranslate";

export const Board = ({
  p,
  n,
  id,
  rows,
  candidate,
  solution,
  shuffle = false,
  colorScheme,
  disableSolution = false,
  disableAnimation = false,
  displayCandidateGhost = false,
  onSubmit,
  ...props
}: {
  p: number;
  n: number;
  id?: string;
  rows: IRow[];
  colorScheme: ColorScheme;
  candidate: (number | null)[];
  solution: Line | null;
  disableAnimation?: boolean;
  disableSolution?: boolean;
  displayCandidateGhost?: boolean;
  shuffle?: boolean;
  onSubmit?: () => void;
  style?: any;
}) => {
  const { t } = useTranslate();

  const dropZone = (
    <>
      <BoardDropZone
        n={n}
        candidate={candidate}
        displayCandidateGhost={displayCandidateGhost}
      />
      {onSubmit && <Submit onClick={onSubmit}>{t("submit")}</Submit>}
    </>
  );

  return (
    <Container {...props}>
      <SideLeft />
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
        key={"candidate"}
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

      {!disableSolution && (
        <BoardSolution
          key={"solution" + id}
          n={n}
          p={p}
          solution={solution}
          shuffle={shuffle}
          colorScheme={colorScheme}
          disableAnimation={disableAnimation}
        />
      )}
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
  filter: brightness(1.035);
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
  filter: brightness(1.05);
`;

const submitAppear = keyframes`
  0%{ 
    transform: translate3d(-120px, 0, 32px) rotateX(-26deg) scale(0.8);
    opacity: 0;
  }
  100%{ 
    transform: translate3d(0, 0, 32px) rotateX(-26deg) scale(0.8);
    opacity: 1;
  }
`;

const Submit = styled.button`
  position: absolute;
  right: -110px;
  width: 120px;
  top: 0;
  bottom: 0px;
  border: none;
  background: transparent;
  transform: translate3d(0, 0, 32px) rotateX(-26deg) scale(0.8);
  transform-origin: center;
  animation: ${submitAppear} 180ms cubic-bezier(0.52, 0.58, 0.72, 1.53);
  pointer-events: auto;

  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${titleFont}
`;
