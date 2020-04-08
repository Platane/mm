import { useEffect, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Peg } from "./Peg";
import { useColorScheme } from "./_hooks/useColorScheme";
import { Board } from "./Board";
import { getRandomLine } from "@mm/solver/getRandomtLine";
import { useTranslate } from "./_hooks/useTranslate";
import { ConfigPageColorScheme } from "./ConfigPageColorScheme";
import { colorSchemes } from "./theme";

export const ConfigPage = ({
  n,
  p,
  setGameConfig,
}: {
  n: number;
  p: number;
  setGameConfig: (p: number, n: number) => void;
}) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [step, setStep] = useState(3);

  const rows = useMemo(
    () =>
      [
        Array.from({ length: n }, (_, i) => i % p),
        Array.from({ length: n }, (_, i) => (i + n) % p),
        ...Array.from({ length: 3 }, () => getRandomLine(p, n)),
        Array.from({ length: n }, (_, i) => (i + n * 2) % p),
      ].map((line) => ({
        line,
        feedback: {
          correct: Math.floor(Math.random() * 3),
          badPosition: Math.floor(Math.random() * 3),
        },
      })),
    [p, n]
  );

  const candidate = useMemo(() => Array.from({ length: n }, () => null), [n]);

  const { t } = useTranslate();

  return (
    <Container>
      <BoardContainer>
        <Board
          n={n}
          p={p}
          rows={rows}
          candidate={candidate}
          style={{ transform: `scale(0.4) rotateY(24deg) rotateX(44deg)` }}
        />
      </BoardContainer>
      <ConfigContainer>
        {step > 0 && (
          <Section>
            <Label>{t("configPage.how_many_slots")}</Label>
            <Input
              type="number"
              min={2}
              max={8}
              value={n}
              onChange={(e) => setGameConfig(p, +e.target.value)}
            />
          </Section>
        )}

        {step > 1 && (
          <Section>
            <Label>{t("configPage.how_many_colors")}</Label>
            <Input
              type="number"
              min={2}
              max={8}
              value={p}
              onChange={(e) => setGameConfig(+e.target.value, n)}
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
                  <ConfigPageColorScheme
                    key={i}
                    colorScheme={cs}
                    onChange={() => setColorScheme(cs)}
                    name="xxx"
                    checked={cs === colorScheme}
                    style={{ margin: "10px" }}
                  />
                ))}
            </ColorSchemes>
          </Section>
        )}
      </ConfigContainer>
    </Container>
  );
};
const ColorSchemes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Label = styled.label``;
const Input = styled.input`
  border: none;
  border-radius: 4px;
  background: none;
  background-color: #fff;
  padding: 6px 10px;
  margin-left: auto;
`;
const Section = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  perspective: 600px;
`;
const ConfigContainer = styled.div`
  margin: 0 auto;
  max-width: 480px;
`;
