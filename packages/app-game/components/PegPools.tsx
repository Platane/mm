import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Object3d } from "./Object3d";
import { Peg } from "./Peg";
import type { ColorScheme } from "../services/colorScheme";
import { useFlyingZone } from "./FlyingPeg/FlyingPegManager";

export const PegPools = ({
  p,
  disabled,
  colorScheme,
  ...props
}: {
  style?: any;
  p: number;
  colorScheme: ColorScheme;
  disabled: boolean;
}) => {
  const { onPointerDown } = useFlyingZone();

  return (
    <Container {...props} disabled={disabled}>
      {Array.from({ length: p }, (_, i) => (
        <Pool key={i} onPointerDown={onPointerDown({ peg: i })}>
          {Array.from({ length: 3 }, (_, j) => (
            <Peg
              key={j}
              color={colorScheme[i]}
              size={20}
              style={{
                margin: "2px",
                transform:
                  `translate3d(${0}px,${0}px,4px) ` +
                  `rotateY(${((i * (i + 1) * j * j * 63) % 45) - 20}deg) ` +
                  `rotateX(${(((i + 1) * j * j * j * 37) % 45) - 20}deg) `,
              }}
            />
          ))}
        </Pool>
      ))}
    </Container>
  );
};

const Container = styled(Object3d)<{ disabled: boolean }>`
  transform: translate3d(0, 0, -30px);
  transition: transform 80ms ease;

  ${(p) =>
    p.disabled
      ? css`
          transition: transform 200ms ease;
          transform: translate3d(40px, 0, -120px) scale(0.8) rotateY(-10deg);
        `
      : ""}
`;

const Pool = styled(Object3d)`
  width: 72px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 2px;

  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  pointer-events: auto;

  & > * {
    pointer-events: none;
  }
`;
