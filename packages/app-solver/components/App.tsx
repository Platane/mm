import { Game } from "./Game";
import { colorSchemes } from "@mm/app-game/services/colorScheme";
import { useAppState } from "../services/appState/useAppState";
import { OnBoarding } from "./OnBoarding";

export const App = () => {
  const { setPage, ...ctx } = useAppState();

  if (ctx.page === "onboarding")
    return (
      <OnBoarding
        {...ctx}
        colorSchemes={colorSchemes}
        onStartGame={() => setPage("game-instruction")}
      />
    );

  return <Game key={ctx.game.id} {...ctx} />;
};
