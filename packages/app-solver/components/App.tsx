import { Game } from "./Game";
import { useAppState } from "../services/appState/useAppState";
import { OnBoarding } from "./OnBoarding";
import { colorSchemes } from "@mm/app-game/components/theme";

export const App = () => {
  const { setPage, ...ctx } = useAppState();

  if (ctx.page === "onboarding")
    return (
      <OnBoarding
        {...ctx}
        colorSchemes={colorSchemes}
        onStartGame={() => setPage("instruction")}
      />
    );

  return <Game key={ctx.game.id} {...ctx} />;
};
