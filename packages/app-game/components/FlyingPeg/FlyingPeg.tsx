import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useConstant } from "../_hooks/useConstant";
import { createPhysic } from "./physic";
import { Object3d } from "../Object3d";
import { Peg } from "../Peg";
import type { ColorScheme } from "../../services/colorScheme";

export type Point = { x: number; y: number };

export const FlyingPeg = ({
  pointerId,
  color,
  onFinish,
  onDrop,
  destination,
  destinationPosition,
  ...props
}: {
  destination?: any;
  destinationPosition?: Point;
  initialPosition: Point;
  initialPointer: Point;
  pointerId: number;
  color: ColorScheme[number];
  onFinish: () => void;
  onDrop: () => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const {
    getTransform,
    setPointer,
    release,
    setDestination,
    step,
  } = useConstant(() => createPhysic(props));

  // propagate destination
  useEffect(() => setDestination(destinationPosition), [destinationPosition]);

  // animate
  useEffect(() => {
    let cancelAnimation: number;
    let d = Date.now();

    const animate = () => {
      cancelAnimationFrame(cancelAnimation);
      cancelAnimation = requestAnimationFrame(animate);

      const now = Date.now();
      const u = (now - d) / 1000;
      const delta = Math.min(u, 2 / 60);
      d = now;

      step(delta);

      const el = ref.current;
      if (!el) return;

      const { position, alpha, rho } = getTransform();

      el.style.transform =
        `translate3d(${position.x}px,${position.y}px,${0}px) ` +
        `rotateZ(${alpha}rad)` +
        `rotateY(${rho}rad)` +
        "";

      // el.style.display = destination ? "none" : "block";
    };
    animate();

    return () => {
      cancelAnimationFrame(cancelAnimation);
    };
  }, []);

  // event listener
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;

      setPointer(event.pageX, event.pageY);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;

      dispose();
      onDrop();

      if (destination) {
        onFinish();
      } else {
        release();

        setTimeout(onFinish, 300);
      }
    };

    const dispose = () => {
      document.body.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("pointerup", onPointerUp);
    };

    document.body.addEventListener("pointermove", onPointerMove);
    document.body.addEventListener("pointerup", onPointerUp);

    return dispose;
  }, [pointerId, destination, onDrop, onFinish]);

  return (
    <Container ref={ref}>
      <Peg
        color={color}
        size={30}
        style={{ transform: `translate3d(0,0,-28px)` }}
      />
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
`;
