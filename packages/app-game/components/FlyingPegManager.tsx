import { useState, useEffect } from "react";
import {
  FlyingPeg,
  getHitOrigin,
  Hit,
  HitOrigin,
  HitDestination,
} from "./FlyingPeg";
import { generateId } from "@mm/utils/generateId";

export type Point = { x: number; y: number };
export type Tracker = {
  id: string;
  origin: Exclude<Hit, { type: "empty" } | undefined>;
  pointerId: number;
  initialPointer: Point;
  initialPosition: Point;
};

export const FlyingPegManager = ({
  onHover,
  onDrop,
  colorScheme,
}: {
  colorScheme: [string, string][];
  onHover: (id: string, origin: HitOrigin, destination: HitDestination) => void;
  onDrop: (id: string, origin: HitOrigin, destination: HitDestination) => void;
}) => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const hit = getHitOrigin(
        (event.target as Element).getAttribute("data-hit")
      );

      if (!hit) return;

      event.preventDefault();
      const id = generateId();

      const box = (event.target as Element).getBoundingClientRect();
      const t = {
        id,
        origin: hit,
        pointerId: event.pointerId,
        initialPointer: { x: event.pageX, y: event.pageY },
        initialPosition: {
          x: (box.left + box.right) / 2,
          y: (box.top + box.bottom) / 2,
        },
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
      {trackers.map((t) => (
        <FlyingPeg
          {...t}
          colorScheme={colorScheme}
          key={t.id}
          onFinish={() => setTrackers((ts) => ts.filter((x) => x !== t))}
          onHover={(destination) => onHover(t.id, t.origin, destination)}
          onDrop={(destination) => onDrop(t.id, t.origin, destination)}
        />
      ))}
    </>
  );
};
