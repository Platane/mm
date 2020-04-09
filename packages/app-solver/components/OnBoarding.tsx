import { useState } from "react";
import styled from "@emotion/styled";
import { useTranslate } from "./_hooks/useTranslate";
import { InputNumber } from "@mm/app-game/components/InputNumber";
import { ColorSchemeRadio } from "@mm/app-game/components/ColorSchemeRadio";
import { Container, Content } from "./Layout";

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
  setColorScheme: (cs: string[][]) => void;
  colorSchemes: string[][][];
  colorScheme: string[][];
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
              min={2}
              max={8}
              value={n}
              onChange={(n: number) => setGameConfig(p, +n)}
            />
            <Button type="submit">
              <label style={{ pointerEvents: "none" }}>{t("ok")}</label>
            </Button>
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
              min={2}
              max={8}
              value={p}
              onChange={(p: number) => setGameConfig(+p, n)}
            />
            <label>{t("chose_color_scheme")}</label>
            <ColorSchemes>
              {colorSchemes
                .filter((cs) => cs.length === p)
                .map((cs, i) => (
                  <ColorSchemeRadio
                    key={i}
                    colorScheme={cs}
                    onChange={() => setColorScheme(cs)}
                    name="xxx"
                    checked={cs === colorScheme}
                    style={{ margin: "10px" }}
                  />
                ))}
            </ColorSchemes>

            <Button type="submit">
              <label style={{ pointerEvents: "none" }}>{t("ok")}</label>
            </Button>
          </Content>
        </form>
      )}
    </Container>
  );
};

const ColorSchemes = styled.div`
  min-height: 200px;
`;

const Button = styled.button`
  border: none;
  background: orange;
  padding: 10px;
  border-radius: 4px;
`;
