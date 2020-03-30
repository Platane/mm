import { useState, useEffect } from "react";
import { FlyingPeg } from "./FlyingPeg";

type Origin = {
  type: "source";
  peg: number;
  p: Point;
};
export type Point = { x: number; y: number };
export type Tracker = {
  peg: number;
  origin: Origin;
  pointerId: number;
  originalPointer: Point;
};

export const FlyingPegManager = ({}: any) => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const hit = (event.target as Element).getAttribute("data-hit");

      if (!hit) return;

      const box = (event.target as Element).getBoundingClientRect();

      const origin = (hit.startsWith("source-") && {
        type: "source",
        p: { x: (box.left + box.right) / 2, y: (box.top + box.bottom) / 2 },
        peg: +hit.split("source-")[1],
      }) || { peg: 0 };

      const t = {
        origin: origin as Origin,
        peg: origin.peg,
        pointerId: event.pointerId,
        originalPointer: { x: event.pageX, y: event.pageY },
      };

      setTrackers((ts) => [...ts, t]);
    };

    document.body.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.body.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <>
      {trackers.map((t, i) => (
        <FlyingPeg
          {...t}
          key={t.pointerId + "-" + i}
          onFinish={() => setTrackers((ts) => ts.filter((x) => x !== t))}
        />
      ))}
    </>
  );
};
