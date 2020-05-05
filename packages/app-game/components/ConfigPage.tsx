import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Board } from "./Board/Board";
import { getRandomLine } from "@mm/solver/getRandomtLine";
import { useTranslate } from "./_hooks/useTranslate";
import { ColorSchemeRadio } from "./ColorSchemeRadio";
import { usePulse } from "./_hooks/usePulse";
import { Object3d } from "./Object3d";
import { InputNumber } from "./InputNumber";
import { useAppState } from "../services/appState/useAppState";
import { colorSchemes, colorSchemeEquals } from "../services/colorScheme";
import { MAX_P, MAX_N } from "../services/config";
import { Button } from "./Button";

const generateGame = (p: number, n: number) => {
  const candidate = Array.from({ length: n }, () => null);

  const lines = [
    Array.from({ length: n }, (_, i) => i % p),
    ...Array.from({ length: n < p ? 1 : 2 }, () => getRandomLine(p, n)),
    ...(n < p ? [Array.from({ length: n }, (_, i) => (i + n * 2) % p)] : []),
  ];

  const rows = lines.map((line) => ({
    line,
    feedback: {
      correct: Math.floor(Math.random() * 3),
      badPosition: Math.floor(Math.random() * 3),
    },
  }));

  return { candidate, rows };
};

export const ConfigPage = ({
  n,
  p,
  colorScheme,
  setColorScheme,
  setPage,
  setGameConfig,
  onboarding = false,
}: ReturnType<typeof useAppState> & {
  onboarding?: false;
}) => {
  const [step, setStep] = useState(onboarding ? 1 : 3);

  const pulse = !!usePulse(
    p + colorScheme.map((a) => a.join()).join() + n,
    100
  );

  const { rows, candidate } = useMemo(() => generateGame(p, n), [p, n]);

  const { t } = useTranslate();

  return (
    <Container>
      <BoardContainer>
        <SmallBoard
          n={n}
          p={p}
          rows={rows}
          colorScheme={colorScheme}
          candidate={candidate}
          solution={null}
          rotateAnimation={pulse}
        />
      </BoardContainer>
      <ConfigContainer
        onSubmit={(e) => {
          e.preventDefault();
          if (step >= 3) {
            setPage("game");
          } else {
            setStep((s) => s + 1);
          }
        }}
      >
        {step > 0 && (
          <Section>
            <Label>{t("configPage.how_many_slots")}</Label>
            <InputNumber
              autoFocus
              min={1}
              max={MAX_N}
              value={n}
              onChange={(n: number) => setGameConfig(p, +n)}
            />
          </Section>
        )}

        {step > 1 && (
          <Section>
            <Label>{t("configPage.how_many_colors")}</Label>
            <InputNumber
              autoFocus
              min={2}
              max={MAX_P}
              value={p}
              onChange={(p: number) => setGameConfig(+p, n)}
            />
          </Section>
        )}

        {step > 2 && (
          <Section style={{ flexDirection: "column" }}>
            <Label>{t("configPage.chose_color_scheme")}</Label>
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
          </Section>
        )}

        {(step < 3 || onboarding) && (
          <Button type="submit">
            {step === 3 ? t("configPage.start_game") : t("configPage.next")}
          </Button>
        )}
      </ConfigContainer>
    </Container>
  );
};

const wobbleFrames = Array.from({ length: 11 }).map((_, i, arr) => {
  const n = i / (arr.length - 1);
  return (
    `${Math.round(n * 100)}%{` +
    `transform: ` +
    `rotateX(${Math.cos(n * Math.PI * 2) * 0.2}deg) ` +
    `rotateY(${Math.sin(n * Math.PI * 2) * 1.3}deg) ` +
    `}`
  );
});
const wobble = keyframes`${wobbleFrames.join("\n")}`;

const rotateAnimation = keyframes`
  0% { transform: scale(0.35) rotateY(-20deg) rotateX(44deg) }
  100% { transform: scale(0.4) rotateY(24deg) rotateX(44deg) }
`;
const SmallBoard = styled(Board)<{ rotateAnimation: boolean }>`
  transform: scale(0.4) rotateY(24deg) rotateX(44deg);
  animation: ${(p) => (p.rotateAnimation ? rotateAnimation : "none")} 100ms
    ease-out;
`;

const ColorSchemes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Label = styled.label`
  margin-right: auto;
`;
const Section = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  margin-bottom: 140px;
  touch-action: auto;
`;
const BoardContainer = styled(Object3d)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  perspective: 600px;
  animation ${wobble} 5000ms linear infinite;
`;
const ConfigContainer = styled.form`
  margin: 0 auto;
  max-width: 520px;
`;
