import styled from "@emotion/styled";
import { useFlyingZone } from "./FlyingPeg/FlyingPegManager";
import { useEffect } from "react";

export const BoardDropZone = ({
  n,
  candidate,
}: {
  n: number;
  candidate: (number | null)[];
}) => {
  const { onPointerDown, onPointerEnter, onPointerLeave } = useFlyingZone();

  // hack for mobile that does not support pointer event on other target that the original one
  // do the hit test ourself :/
  useEffect(() => {
    let previousHitString: string | undefined;

    const handler = (event: any) => {
      const { pageX, pageY } = event;

      let hitString: string | undefined;
      let position: { x: number; y: number } | undefined;

      // @ts-ignore
      for (const el of document.querySelectorAll("[data-zone]")) {
        const box = el.getBoundingClientRect();

        if (
          box.left <= pageX &&
          pageX <= box.right &&
          box.top <= pageY &&
          pageY <= box.bottom
        ) {
          hitString = el.getAttribute("data-zone");
          position = {
            x: (box.left + box.right) / 2,
            y: (box.top + box.bottom) / 2,
          };
        }
      }

      if (hitString !== previousHitString) {
        const leave =
          previousHitString &&
          onPointerLeave(JSON.parse(previousHitString), position);
        if (leave) leave(event);

        const enter =
          hitString && onPointerEnter(JSON.parse(hitString), position);
        if (enter) enter(event);

        previousHitString = hitString;
      }
    };

    document.addEventListener("pointermove", handler);

    return () => document.removeEventListener("pointermove", handler);
  }, [onPointerEnter, onPointerLeave]);

  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const peg = candidate[i];
        const hit = { k: i, peg };

        return (
          <Zone
            key={i}
            data-zone={JSON.stringify(hit)}
            onPointerDown={
              peg === null ? undefined : onPointerDown({ k: i, peg })
            }
            onPointerEnter={onPointerEnter(hit)}
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

const mx = 2;
const my = 10;

const Zone = styled.div`
  position: absolute;
  border-radius: 40%;
  top: ${my}px;
  bottom: ${my}px;
  background-color: rgba(0, 0, 0, 0);
`;
