import styled from "@emotion/styled";
import { useState, useEffect } from "react";

type Props = {
  min: number;
  max: number;
  step: number;
  autoFocus?: boolean;
  onChange: (v: number | null) => void;
};

export const InputNumber = ({
  value,
  autoFocus,
  min,
  max,
  step = 1,
  onChange,
  ...props
}: Props & any) => {
  const [literal, setLiteral] = useState(value.toString());
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setLiteral(value.toString());
  }, [value, focused]);

  const f = (x: number) => clamp(min, max)(round(step)(x));

  return (
    <Container {...props}>
      <Button
        onClick={() => onChange(f(value - 1))}
        tabIndex={-1}
        type="button"
      >
        <label>-</label>
      </Button>
      <Input
        autoFocus={autoFocus}
        type="number"
        value={literal}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onChange={(e) => {
          setLiteral(e.target.value);
          onChange(e.target.value ? f(+e.target.value) : null);
        }}
      />
      <Button
        onClick={() => onChange(f(value + 1))}
        tabIndex={-1}
        type="button"
      >
        <label>+</label>
      </Button>
    </Container>
  );
};

const clamp = (a: number, b: number) => (x: number) =>
  Math.max(a, Math.min(b, x));

const round = (step = 1) => (x: number) => Math.round(x * step) / step;

const Input = styled.input`
  border: none;
  background: none;
  background-color: #fff;
  padding: 6px 10px;
  margin: 0 2px;
  width: 60px;
  border-radius: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;

const Button = styled.button`
  margin: 0;
  border: none;
  padding: 6px 10px;
  background-color: #fff;
  width: 40px;
  border-radius: 0;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 40px;
`;
