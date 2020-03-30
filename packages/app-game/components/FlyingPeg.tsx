import { useEffect, useRef } from "react";
import { Peg } from "@mm/app-cheater/components/Peg";
import { Tracker } from "./FlyingPegManager";
import styled from "@emotion/styled";
import { Object3d } from "@mm/app-cheater/components/Object3d";

export const FlyingPeg = ({
  peg,
  pointerId,
  originalPointer,
  origin,
  onFinish,
}: Tracker & { onFinish: () => void }) => {
  const ref = useRef<Element>();

  useEffect(() => {
    console.log(origin);

    let cancelAnimation: number;
    let pointer = { ...originalPointer };
    let p = { ...origin.p };
    let v = { x: 0, y: 0 };
    let finished = false;

    let d = Date.now();

    const animate = () => {
      cancelAnimationFrame(cancelAnimation);
      cancelAnimation = requestAnimationFrame(animate);

      const now = Date.now();
      const delta = (now - d) / 1000;
      d = now;

      const tension = 210;
      const friction = 20;

      let ax = -tension * (p.x - pointer.x) - friction * v.x;
      let ay = -tension * (p.y - pointer.y) - friction * v.y;

      v.x += ax * delta;
      v.y += ay * delta;

      p.x += v.x * delta;
      p.y += v.y * delta;

      const el = ref.current;
      if (!el) return;

      el.style.transform = `translate3d(${p.x}px,${p.y}px,${0}px)`;
    };
    animate();

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId || finished) return;

      pointer.x = event.pageX;
      pointer.y = event.pageY;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId || finished) return;
      finished = true;

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
      <Peg peg={peg} size={28} />
    </Container>
  );
};

const Container = styled(Object3d)`
  position: absolute;
  left: -14px;
  top: -14px;
  transform: translate3d(-100px, -100px, 0);
` as any;
