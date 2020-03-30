import styled from "@emotion/styled";
import { useColorScheme } from "./_hooks/useColorScheme";
import { Peg as IPeg } from "@mm/solver/type";
import { Object3d } from "./Object3d";

export const Peg = ({
  peg,
  size,
  ...props
}: { peg: IPeg | "correct" | "badPosition"; size: number } & {
  style?: any;
}) => {
  const { colorScheme } = useColorScheme();
  const [c1, c2] = getColor(colorScheme, peg);

  return (
    <Bottom
      {...props}
      size={size}
      style={{ ...props.style, backgroundColor: c2 }}
    >
      <Body size={size} style={{ backgroundColor: c2 }} />
      <Top size={size} style={{ backgroundColor: c1 }} />
    </Bottom>
  );
};

const getColor = (
  colorScheme: Record<IPeg, string>,
  peg: IPeg | "correct" | "badPosition"
) => {
  switch (peg) {
    case "correct":
      return ["#333", "#000"];
    case "badPosition":
      return ["#fff", "#ddd"];
    default:
      return colorScheme[peg];
  }
};

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
