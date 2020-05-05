import { useState } from "react";
import styled from "@emotion/styled";
import { useTranslate } from "./_hooks/useTranslate";
import { InputNumber } from "@mm/app-game/components/InputNumber";
import { ColorSchemeRadio } from "@mm/app-game/components/ColorSchemeRadio";
import { Container, Content } from "./Layout";
import { colorSchemeEquals } from "@mm/app-game/services/colorScheme";
import { MAX_P, MAX_N } from "@mm/app-game/services/config";
import { Button } from "./Button";
import type { ColorScheme } from "@mm/app-game/services/colorScheme";

export const OnBoarding = ({
  p,
  n,
  setGameConfig,
  setColorScheme,
  colorSchemes,
  colorScheme,
  onStartGame,
}: {
  p: number;
  n: number;
  setGameConfig: (p: number, n: number) => void;
  setColorScheme: (cs: ColorScheme) => void;
  colorSchemes: ColorScheme[];
  colorScheme: ColorScheme;
  onStartGame: () => void;
}) => {
  const [step, setStep] = useState<"intro" | "n" | "p">("n");
  const { t } = useTranslate();

  return (
    <Container>
      {step === "n" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep("p");
          }}
        >
          <Content>
            <label>{t("how_many_slots")}</label>
            <InputNumber
              autoFocus
              min={1}
              max={MAX_N}
              value={n}
              onChange={(n: number) => setGameConfig(p, +n)}
            />

            <Separator />

            <Button type="submit">{t("ok")}</Button>
          </Content>
        </form>
      )}

      {step === "p" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onStartGame();
          }}
        >
          <Content>
            <label>{t("how_many_colors")}</label>
            <InputNumber
              autoFocus
              min={2}
              max={MAX_P}
              value={p}
              onChange={(p: number) => setGameConfig(+p, n)}
            />

            <Separator />

            <label>{t("chose_color_scheme")}</label>
            <ColorSchemes>
              {colorSchemes
                .filter((cs) => cs.length === p)
                .map((cs, i) => (
                  <ColorSchemeRadio
                    key={i}
                    colorScheme={cs}
                    onChange={() => setColorScheme(cs)}
                    name="color scheme"
                    checked={colorSchemeEquals(cs, colorScheme)}
                    style={{ margin: "10px" }}
                  />
                ))}
            </ColorSchemes>

            <Separator />

            <Button type="submit">{t("ok")}</Button>
          </Content>
        </form>
      )}
    </Container>
  );
};

const ColorSchemes = styled.div`
  min-height: 200px;
`;

const Separator = styled.div`
  display: block;
  width: 32px;
  height: 32px;
`;
