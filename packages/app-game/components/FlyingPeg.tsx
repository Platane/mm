import { useEffect, useRef } from "react";
import { Peg } from "@mm/app-cheater/components/Peg";
import { Tracker } from "./FlyingPegManager";
import styled from "@emotion/styled";
import { Object3d } from "@mm/app-cheater/components/Object3d";

export const FlyingPeg = ({
  pointerId,
  initialPointer,
  initialPosition,
  origin,
  onFinish,
  onHover,
  onDrop,
}: Tracker & {
  onFinish: () => void;
  onHover: (destination: HitDestination) => void;
  onDrop: (destination: HitDestination) => void;
}) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    let pointer = { ...initialPointer };
    let p = { ...initialPosition };
    let v = { x: 0, y: 0 };
    let finished = false;
    let destination: Exclude<Hit, { type: "source" }>;

    onHover(destination);

    let cancelAnimation: number;
    let d = Date.now();
    const animate = () => {
      cancelAnimationFrame(cancelAnimation);
      cancelAnimation = requestAnimationFrame(animate);

      const now = Date.now();
      const delta = (now - d) / 1000;
      d = now;

      const tension = 210;
      const friction = 14;
      // const friction = 20;

      let ax = -tension * (p.x - pointer.x) - friction * v.x;
      let ay = -tension * (p.y - pointer.y) - friction * v.y;

      v.x += ax * delta;
      v.y += ay * delta;

      p.x += v.x * delta;
      p.y += v.y * delta;

      const el = ref.current;
      if (!el) return;

      el.style.transform = `translate3d(${p.x}px,${p.y}px,${0}px)`;
      el.style.display = destination ? "none" : "block";
    };
    animate();

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId || finished) return;

      pointer.x = event.pageX;
      pointer.y = event.pageY;

      const hit = getHitDestination(
        (event.target as Element).getAttribute("data-hit")
      );

      if (JSON.stringify(hit) !== JSON.stringify(destination)) {
        destination = hit;
        onHover(destination);
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId || finished) return;

      finished = true;

      onDrop(destination);
      // onFinish();
    };

    document.body.addEventListener("pointermove", onPointerMove);
    document.body.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(cancelAnimation);
      document.body.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <Container ref={ref}>
      <Peg peg={(origin as any).peg} size={28} />
    </Container>
  );
};

const Container = styled(Object3d)`
  position: absolute;
  left: -14px;
  top: -14px;
  transform: translate3d(-100px, -100px, 0);
  pointer-events: none;
  user-select: none;
` as any;

export const getHit = (stringHit: string | null) => {
  if (!stringHit) return;

  const [type, ...params] = stringHit.split("-");

  switch (type) {
    case "source":
      return { type: "source" as const, peg: +params[0] };
    case "candidate":
      return { type: "candidate" as const, k: +params[0], peg: +params[1] };
    case "empty":
      return { type: "empty" as const, k: +params[0] };
  }
};

export const getHitDestination = (stringHit: string | null) => {
  const h = getHit(stringHit);
  return (h && h.type !== "source" && h) || undefined;
};
export const getHitOrigin = (stringHit: string | null) => {
  const h = getHit(stringHit);
  return (h && h.type !== "empty" && h) || undefined;
};

export type Hit = ReturnType<typeof getHit>;
export type HitOrigin = Exclude<Hit, { type: "empty" } | undefined>;
export type HitDestination = Exclude<Hit, { type: "source" }>;
