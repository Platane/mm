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
import type { Session } from "@mm/app-game/services/communication/session";

export const OnBoarding = ({
  p,
  n,
  setGameConfig,
  setColorScheme,
  colorSchemes,
  colorScheme,
  onStartGame,
  bindSession,
  availableSessions,
}: {
  p: number;
  n: number;
  setGameConfig: (p: number, n: number) => void;
  setColorScheme: (cs: ColorScheme) => void;
  colorSchemes: ColorScheme[];
  colorScheme: ColorScheme;
  onStartGame: () => void;
  availableSessions: Session[];
  bindSession: (id: string) => void;
}) => {
  const [availableSession] = availableSessions;
  const [step, setStep] = useState<"intro" | "n" | "p">("intro");
  const { t } = useTranslate();

  return (
    <Container>
      {step === "intro" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep("n");
          }}
        >
          <Content>
            <label>
              This app Compute the best combination to win every master mind
              game
            </label>

            <Separator />
            <Separator />

            {availableSession ? (
              <>
                <label>{t("there_is_a_game_running_in_another_window")}</label>

                <Separator />

                <Row>
                  <Button
                    type="button"
                    onClick={() => {
                      bindSession(availableSession.id);
                    }}
                  >
                    {t("solve_this_game")}
                  </Button>

                  <label style={{ margin: "0 4px" }}>{t("or")}</label>

                  <Button type="submit">{t("start_fresh")}</Button>
                </Row>

                <Separator />
              </>
            ) : (
              <Button type="submit">{t("ok")}</Button>
            )}
          </Content>
        </form>
      )}

      {step === "n" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep("p");
          }}
        >
          <Content>
            <label>{t("how_many_slots")}</label>

            <Separator />

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

            <Separator />

            <InputNumber
              autoFocus
              min={2}
              max={MAX_P}
              value={p}
              onChange={(p: number) => setGameConfig(+p, n)}
            />

            <Separator />

            <label>{t("chose_color_scheme")}</label>

            <Separator />

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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const ColorSchemes = styled.div`
  min-height: 200px;
  margin: -10px;
`;

const Separator = styled.div`
  display: block;
  width: 32px;
  height: 32px;
`;
