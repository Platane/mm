import { useState, createContext, useMemo, useContext, useEffect } from "react";
import { FlyingPeg } from "./FlyingPeg";
import { generateId } from "@mm/utils/generateId";
import { ColorScheme } from "../../services/colorScheme";

export type Point = { x: number; y: number };
export type Tracker = {
  id: string;
  pointerId: number;

  origin: HitOrigin;
  initialPointer: Point;
  initialPosition: Point;

  destination?: HitDestination;
  destinationPosition?: Point;
};

type HitOrigin = { peg: number; k?: number };
type HitDestination = { k?: number };

type ContextType = {
  flying: boolean;
  onPointerEnter: (
    hit: HitDestination,
    position?: Point
  ) => undefined | ((e: any) => void);
  onPointerLeave: (
    hit: HitDestination,
    position?: Point
  ) => undefined | ((e: any) => void);
  onPointerDown: (
    hit: HitOrigin,
    position?: Point
  ) => undefined | ((e: any) => void);
};

const context = createContext({
  flying: false,
  onPointerEnter: () => undefined,
  onPointerLeave: () => undefined,
  onPointerDown: () => undefined,
} as ContextType);

const Provider = context.Provider;

export const FlyingPegManager = ({
  colorScheme,
  children,
  onTemporaryMutationsChange,
  onChange,
}: {
  colorScheme: ColorScheme;
  onTemporaryMutationsChange: (ts: Tracker[]) => void;
  onChange: (t: Tracker) => void;
  children: any;
}) => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);

  const providerValue = useMemo(() => {
    const onPointerDown = (origin: HitOrigin, position?: Point) => (
      event: PointerEvent
    ) => {
      if (origin.peg === null) return;

      event.preventDefault();
      event.stopPropagation();

      const id = generateId();
      const pointerId = event.pointerId;
      const initialPointer = { x: event.pageX, y: event.pageY };
      const initialPosition = getPosition(event, position);

      setTrackers((ts) => [
        ...ts,
        { id, pointerId, origin, initialPosition, initialPointer },
      ]);
    };

    if (trackers.length === 0)
      return {
        flying: false,
        onPointerDown,
        onPointerLeave: () => undefined,
        onPointerEnter: () => undefined,
      };

    const onPointerEnter = (destination: HitDestination, position?: Point) => (
      event: PointerEvent
    ) => {
      const pointerId = event.pointerId;
      const destinationPosition = getPosition(event, position);

      setTrackers((ts) =>
        ts.map((t) =>
          t.pointerId === pointerId &&
          (!t.destination || !hitEquals(t.destination, destination))
            ? { ...t, destination, destinationPosition }
            : t
        )
      );
    };

    const onPointerLeave = (destination: HitDestination) => (
      event: PointerEvent
    ) => {
      const pointerId = event.pointerId;

      setTrackers((ts) =>
        ts.map((t) =>
          t.pointerId === pointerId &&
          t.destination &&
          hitEquals(t.destination, destination)
            ? {
                ...t,
                destination: undefined,
                destinationPosition: undefined,
              }
            : t
        )
      );
    };

    return { onPointerDown, onPointerEnter, onPointerLeave, flying: true };
  }, [trackers.length > 0]);

  useEffect(() => {
    onTemporaryMutationsChange(trackers);
  }, [trackers]);

  return (
    <Provider value={providerValue}>
      <>
        {children}

        {trackers.map((t) => (
          <FlyingPeg
            key={t.id}
            {...t}
            color={colorScheme[t.origin.peg]}
            onDrop={() => onChange(t)}
            onFinish={() =>
              setTrackers((ts) => ts.filter((x) => x.id !== t.id))
            }
          />
        ))}
      </>
    </Provider>
  );
};

const getPosition = (event: PointerEvent, position?: Point) => {
  if (position) return position;
  const box = (event.target as Element).getBoundingClientRect();
  return {
    x: (box.left + box.right) / 2,
    y: (box.top + box.bottom) / 2,
  };
};

export const useFlyingZone = () => useContext(context);

export const hitEquals = (
  a: HitOrigin | HitDestination,
  b: HitOrigin | HitDestination
) => a.k === b.k && (a as any).peg === (b as any).peg;
