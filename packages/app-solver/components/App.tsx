import { Game } from "./Game";
import { colorSchemes } from "@mm/app-game/services/colorScheme";
import { useAppState } from "../services/appState/useAppState";
import { OnBoarding } from "./OnBoarding";
import { Delayed } from "@mm/app-game/components/Delayed";
import { Banner } from "./Banner";
import { Background } from "./Background";

export const App = () => {
  const { setPage, ...ctx } = useAppState();

  if (ctx.page === "onboarding")
    return (
      <>
        <Background />
        <Delayed delay={50}>
          <OnBoarding
            {...ctx}
            colorSchemes={colorSchemes}
            onStartGame={() => setPage("game-instruction")}
          />
        </Delayed>
      </>
    );

  return (
    <>
      <Background />
      {ctx.sessionId && <Banner />}
      <Game key={ctx.game.id} {...ctx} />
    </>
  );
};
