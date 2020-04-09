import { useState, useEffect } from "react";
import { useGameConfig } from "@mm/app-game/components/_hooks/useGameConfig";
import { colorSchemes } from "@mm/app-game/components/theme";
import { useColorScheme } from "@mm/app-game/components/_hooks/useColorScheme";
import { OnBoarding } from "./OnBoarding";
import { Game } from "./Game";

export const App = () => {
  const [started, setStarted] = useState(false);
  const { p, n, setGameConfig } = useGameConfig();
  const { setColorScheme, colorScheme } = useColorScheme();

  if (!started)
    return (
      <OnBoarding
        p={p}
        n={n}
        colorScheme={colorScheme}
        colorSchemes={colorSchemes}
        setGameConfig={setGameConfig}
        setColorScheme={setColorScheme}
        onStartGame={() => setStarted(true)}
      />
    );
  else return <Game key={p + "/" + n} p={p} n={n} />;
};
