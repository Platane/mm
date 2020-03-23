import styled from "@emotion/styled";
import { useColorScheme } from "./_hooks/useColorScheme";
import { Peg as IPeg } from "@mm/solver/type";

export const Peg = ({ peg, ...props }: { peg: IPeg } & { style: any }) => {
  const { colors } = useColorScheme();
  const color = colors[peg];

  return (
    <Container {...props}>
      <Top style={{ backgroundColor: color }} />
      <Body
        style={{
          backgroundColor: color,
          filter: "saturate(0.8) brightness(0.9)",
        }}
      />
      <Bottom
        style={{
          backgroundColor: color,
          filter: "saturate(0.8) brightness(0.9)",
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  transform-style: preserve-3d;
`;
const Top = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateZ(30px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
const Body = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateZ(14px) rotateX(90deg);
  width: 30px;
  height: 30px;
`;
const Bottom = styled(Top)`
  transform: translateZ(0px);
`;
