import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Peg } from "./Peg";
import { Object3d } from "./Object3d";
import { Tracker } from "./FlyingPegManager";

export const FlyingPeg = ({
  pointerId,
  colorScheme,
  initialPointer,
  initialPosition,
  origin,
  onFinish,
  onHover,
  onDrop,
}: Tracker & {
  colorScheme: [string, string][];
  onFinish: () => void;
  onHover: (destination: HitDestination) => void;
  onDrop: (destination: HitDestination) => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let pointer = { ...initialPointer };
    let p = { ...initialPosition };
    let v = { x: 0, y: 0 };
    let op = { ...initialPosition, z: 0 };
    let ov = { x: 0, y: 0, z: 0 };
    let released = false;
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

      {
        const tension = 410;
        const friction = 28;

        const ax = -tension * (p.x - pointer.x) - friction * v.x;
        const ay = -tension * (p.y - pointer.y) - friction * v.y;

        v.x += ax * delta;
        v.y += ay * delta;

        p.x += v.x * delta;
        p.y += v.y * delta;
      }

      {
        const tension = 410;
        const friction = 4;
        const g = 1000 * 4;
        const size = 30;

        const dx = op.x - p.x;
        const dy = op.y - p.y;
        const dz = op.z - 0;

        const l = Math.max(1, Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2));

        const ax = -tension * (l - size) * (dx / l) - friction * ov.x;
        const ay = -tension * (l - size) * (dy / l) - friction * ov.y;
        const az = -tension * (l - size) * (dz / l) - friction * ov.z + g;

        ov.x += ax * delta;
        ov.y += ay * delta;
        ov.z += az * delta;

        op.x += ov.x * delta;
        op.y += ov.y * delta;
        op.z += ov.z * delta;

        {
          const dx = op.x - p.x;
          const dy = op.y - p.y;
          const dz = op.z - 0;

          const l = Math.max(1, Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2));

          const L = size;
          if (l > L || true) {
            op.x = p.x + (dx / L) * size;
            op.y = p.y + (dy / L) * size;
            op.z = 0 + (dz / L) * size;
          }
        }
      }

      const el = ref.current;
      if (!el) return;

      const alpha = Math.atan2(op.y - p.y, op.x - p.x);
      // const alpha = 0;

      const rho = Math.atan2(-Math.abs(op.x - p.x), op.z - 0);
      // const rho = 0;

      el.style.transform =
        `translate3d(${p.x}px,${p.y}px,${0}px) ` +
        `rotateZ(${alpha}rad)` +
        `rotateY(${rho}rad)` +
        "";

      el.style.display = destination ? "none" : "block";

      // {
      //   const body = el.querySelector("[data-body]");
      //   body.style.transform =
      //     `translateZ(${13}px) ` + `rotateZ(${0}deg) ` + `rotateX(90deg) `;
      //   body.style.display = "none";
      // }

      // ref2.current.style.transform =
      //   `translate3d(${op.x}px,${op.y}px,${op.z}px) ` +
      //   `scale(${1 - op.z / 50}) `;

      // if (p.y > 300) {
      //   cancelAnimationFrame(cancelAnimation);
      // }
    };
    animate();

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId || released) return;

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
      if (event.pointerId !== pointerId || released) return;

      released = true;

      onDrop(destination);
      onFinish();
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
    <>
      <div
        ref={ref2}
        style={{
          zIndex: 5,
          position: "absolute",
          left: "-5px",
          top: "-5px",
          width: "10px",
          height: "10px",
          background: "purple",
          borderRadius: "5px",
        }}
      />
      <Container ref={ref}>
        <Peg
          color={colorScheme[origin.peg]}
          size={30}
          style={{ transform: `translate3d(0,0,-28px)` }}
        />
      </Container>
    </>
  );
};

const Container = styled(Object3d)`
  position: absolute;
  left: -14px;
  top: -14px;
  transform: translate3d(-100px, -100px, 0);
  pointer-events: none;
  user-select: none;

  // &:after {
  //   position: absolute;
  //   content: "";
  //   width: 40px;
  //   height: 4px;
  //   background: #fff;
  //   top: 12px;
  //   left: 12px;
  //   z-index: 10000;
  //   border-radius: 2px;
  // }
`;

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
