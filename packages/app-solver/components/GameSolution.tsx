import styled from "@emotion/styled";
import { Peg } from "@mm/app-game/components/Peg";
import { Object3d } from "@mm/app-game/components/Object3d";
import { useTranslate } from "./_hooks/useTranslate";
import { Button } from "./Button";
import type { ColorScheme } from "@mm/app-game/services/colorScheme";
import type { Line as ILine } from "@mm/solver/type";
import { Separator } from "@mm/app-game/components/Separator";

type Props = {
  p: number;
  n: number;
  colorScheme: ColorScheme;
  candidate: ILine;
  onSubmit: () => void;
};

export const GameSolution = ({
  p,
  n,
  colorScheme,
  candidate,
  onSubmit,
  ...props
}: Props) => {
  const { t } = useTranslate();

  return (
    <FormContainer
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label>{t("play_this_line")}</label>
      <Line style={{ maxWidth: `${candidate.length * 50}px` }}>
        {candidate.map((peg, i) => (
          <Peg key={i} color={colorScheme[peg]} size={28} />
        ))}
      </Line>

      <Separator />

      <Button type="submit">{t("ok")}</Button>
    </FormContainer>
  );
};

const FormContainer = styled.form``;

const Line = styled(Object3d)`
  transform-style: preserve-3d;
  transform: rotateX(45deg);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0 10px 0;
`;
