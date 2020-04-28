import styled from "@emotion/styled";
import { useFlyingZone } from "./FlyingPeg/FlyingPegManager";

export const BoardDropZone = ({
  n,
  candidate,
  ...props
}: {
  n: number;
  candidate: (number | null)[];
}) => {
  const { onPointerDown, onPointerEnter, onPointerLeave } = useFlyingZone();

  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const hit = { type: "line", k: i, peg: candidate[i] };

        return (
          <Zone
            key={i}
            onPointerDown={onPointerDown(hit)}
            onPointerMove={() => console.warn("move")}
            onPointerMove={onPointerEnter(hit)}
            onPointerOut={onPointerLeave(hit)}
            style={{
              left: `calc( ${mx}px +  ${(i * 100) / n}% )`,
              width: `calc( ${100 / n}% - ${mx * 2}px)`,
            }}
          />
        );
      })}
    </>
  );
};

const mx = 10;
const my = 10;

const Zone = styled.div`
  pointer-events: auto;
  position: absolute;
  border-radius: 40%;
  top: ${my}px;
  bottom: ${my}px;
  background-color: rgba(0, 0, 0, 0);
`;
