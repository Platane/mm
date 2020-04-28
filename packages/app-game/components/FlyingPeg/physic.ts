export type Point = { x: number; y: number };

export const createPhysic = ({
  initialPointer,
  initialPosition,
}: {
  initialPointer: Point;
  initialPosition: Point;
}) => {
  let pointer = { ...initialPointer };
  let p = { ...initialPosition };
  let v = { x: 0, y: 0 };
  let op = { ...initialPosition, z: 0 };
  let ov = { x: 0, y: 0, z: 0 };
  let released = false;
  let destination: Point | undefined;

  const setPointer = (x: number, y: number) => {
    if (destination) return;

    pointer.x = x;
    pointer.y = y;
  };

  const setDestination = (d: Point | undefined) => {
    destination = d;

    if (destination) {
      pointer.x = destination.x;
      pointer.y = destination.y;
    }
  };

  const release = () => {
    released = true;
  };

  const step = (delta: number) => {
    {
      let ax = 0;
      let ay = 0;

      if (!released) {
        const tension = 410;
        const friction = 28;

        ax = -tension * (p.x - pointer.x) - friction * v.x;
        ay = -tension * (p.y - pointer.y) - friction * v.y;
      } else {
        const friction = 2;

        ax = -friction * v.x;
        ay = -friction * v.y;
      }

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

      const l = Math.max(1, Math.sqrt(dx * dx + dy * dy + dz * dz));

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
  };

  const getTransform = () => {
    if (destination) return { position: p, alpha: 0, rho: 0 };

    const alpha = Math.atan2(op.y - p.y, op.x - p.x);
    // const alpha = 0;

    const rho = Math.atan2(-Math.abs(op.x - p.x), op.z - 0);
    // const rho = 0;

    return { alpha, rho, position: p };
  };

  return { step, getTransform, release, setDestination, setPointer };
};
