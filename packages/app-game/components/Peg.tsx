import styled from "@emotion/styled";
import { Object3d } from "./Object3d";

export const Peg = ({
  size,
  color,
  ...props
}: {
  size: number;
  color: [string, string];
  style?: any;
}) => (
  <Bottom
    {...props}
    size={size}
    style={{ ...props.style, backgroundColor: color[1] }}
  >
    <Body size={size} data-body style={{ backgroundColor: color[1] }} />
    <Body2 size={size} style={{ backgroundColor: color[1] }} />
    <Top size={size} style={{ backgroundColor: color[0] }} />
  </Bottom>
);

export const PegFeedback = ({
  peg,
  ...props
}: {
  size: number;
  peg: "correct" | "badPosition";
  style?: any;
}) => (
  <Peg
    color={
      ((peg === "correct" && ["#333", "#000"]) ||
        (peg === "badPosition" && ["#fff", "#ddd"])) as any
    }
    {...props}
  />
);

const Bottom = styled(Object3d)<{ size: number }>`
  position: relative;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: 50%;
  flex: auto 0 0;
`;
const Top = styled(Object3d)<{ size: number }>`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateZ(${(p) => p.size}px);
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: 50%;
`;
const Body = styled(Object3d)<{ size: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateZ(${(p) => p.size / 2 - 1}px) rotateX(90deg);
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
`;
const Body2 = styled(Object3d)<{ size: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateZ(${(p) => p.size / 2 - 1}px) rotateZ(90deg)
    rotateX(90deg);
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
`;
