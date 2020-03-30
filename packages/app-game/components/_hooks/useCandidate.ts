import { useState } from "react";
import { HitDestination, HitOrigin } from "../FlyingPeg";

export const useCandidate = (n: number) => {
  type Candidate = (number | null)[];

  const [candidate, setCandidate] = useState<Candidate>(
    Array.from({ length: n }, () => null)
  );

  const [mutations, setMutations] = useState<
    { id: string; origin: HitOrigin; destination: HitDestination }[]
  >([]);

  const onHover = (
    id: string,
    origin: HitOrigin,
    destination: HitDestination
  ) =>
    setMutations((ms) => [
      ...ms.filter((m) => m.id !== id),
      { id, origin, destination },
    ]);

  const onDrop = (
    id: string,
    origin: HitOrigin,
    destination: HitDestination
  ) => {
    setMutations((ms) => ms.filter((m) => m.id !== id));
    setCandidate((c) => {
      if (origin.type === "candidate")
        c = c.map((x, i) => (i === origin.k ? null : x));

      if (destination)
        c = c.map((x, i) => (i === destination.k ? origin.peg : x));

      return c;
    });
  };

  const reset = () => setCandidate(Array.from({ length: n }, () => null));

  const temporaryCandidate = mutations.reduce(
    (c: Candidate, { origin, destination }) => {
      if (origin.type === "candidate")
        c = c.map((x, i) => (i === origin.k ? null : x));

      if (destination)
        c = c.map((x, i) => (i === destination.k ? origin.peg : x));

      return c;
    },
    candidate
  );

  return {
    onHover,
    onDrop,
    reset,
    candidate,
    temporaryCandidate,
  };
};
