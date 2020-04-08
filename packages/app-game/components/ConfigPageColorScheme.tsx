import styled from "@emotion/styled";
import { boardColor } from "./theme";

export const ConfigPageColorScheme = ({
  colorScheme,
  name,
  checked,
  onChange,
  ...props
}: {
  checked: boolean;
  name: string;
  colorScheme: string[][];
  onChange: () => void;
  style?: any;
}) => (
  <Container checked={checked} {...props}>
    <Radio
      type="radio"
      name={name}
      checked={checked}
      value={colorScheme.map((c) => c.join("")).join("")}
      onChange={onChange}
      style={{ width: `${34 * colorScheme.length + 12}px` }}
    />
    <Line>
      {colorScheme.map(([color1, color2]) => (
        <Dot key={color1} style={{ backgroundColor: color2 }}>
          <DotTop style={{ backgroundColor: color1 }} />
        </Dot>
      ))}
    </Line>
  </Container>
);

const Line = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${boardColor};
  border-radius: 4px;
  padding: 4px;
  position: relative;
  z-index: 1;
  pointer-events: none;
`;

const DotTop = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  position: absolute;
  top: -6px;
`;
const Dot = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  position: relative;
  margin: 4px;
`;

const Radio = styled.input`
  position: absolute;
  top: -1px;
  left: -2px;
  height: 44px;
  margin: 0;
`;

const Container = styled.div<{ checked: boolean }>`
  position: relative;
  border-radius: 4px;
  box-shadow: 0 0 0 2px ${(p) => (p.checked ? "#fff" : "transparent")};
  transition: transform 160ms ease;
  transform: scale(${(p) => (p.checked ? 1 : 1)});

  &:hover,
  &:active {
    transform: scale(0.97);
  }
`;
