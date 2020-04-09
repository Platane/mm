import styled from "@emotion/styled";

type Props = {
  onChange: (v: number | null) => void;
};

export const InputNumber = (props: Props & any) => (
  <Input
    type="number"
    {...props}
    onChange={(e) =>
      props.onChange(e.target.value === "" ? null : +e.target.value)
    }
  />
);

const Input = styled.input`
  border: none;
  border-radius: 4px;
  background: none;
  background-color: #fff;
  padding: 6px 10px;
  margin-left: auto;
`;
