import styled from "@emotion/styled";
import { useState, useEffect } from "react";

type Props = {
  min: number;
  max: number;
  step: number;
  onChange: (v: number | null) => void;
};

export const InputNumber = ({ value, ...props }: Props & any) => {
  const [literal, setLiteral] = useState(value.toString());
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setLiteral(value.toString());
  }, [value, focused]);

  return (
    <Input
      type="number"
      value={literal}
      {...props}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        setLiteral(e.target.value);

        if (!e.target.value) {
          props.onChange(null);
        } else {
          const v = clamp(
            props.min,
            props.max
          )(round(props.step)(+e.target.value));

          props.onChange(v);
        }
      }}
    />
  );
};

const clamp = (a: number, b: number) => (x: number) =>
  Math.max(a, Math.min(b, x));

const round = (step = 1) => (x: number) => Math.round(x * step) / step;

const Input = styled.input`
  border: none;
  border-radius: 4px;
  background: none;
  background-color: #fff;
  padding: 6px 10px;
  margin-left: auto;
`;
