import { useState, useEffect, useCallback } from "react";
import { useGameConfig } from "@mm/app-game/components/_hooks/useGameConfig";
import { colorSchemes } from "@mm/app-game/components/theme";
import { useColorScheme } from "@mm/app-game/components/_hooks/useColorScheme";
import { createSharedCommunication } from "@mm/app-game/services/communication/createSharedCommunication";
import { OnBoarding } from "./OnBoarding";
import { Game } from "./Game";

export const App = () => {
  const [started, setStarted] = useState(false);
  const { p, n, setGameConfig } = useGameConfig();
  const [initialRows, setInitialRows] = useState([]);
  const { setColorScheme, colorScheme } = useColorScheme();

  const onUpdate = useCallback((game?: any) => {
    if (game) {
      setInitialRows(game.rows);
      setGameConfig(game.p, game.n);
      console.log(game.rows);
    }
  }, []);

  useSharedCommunication(onUpdate);

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
  else return <Game key={p + "/" + n} p={p} n={n} initialRows={initialRows} />;
};

const useSharedCommunication = (onUpdate: (a: any) => void) => {
  useEffect(() => {
    const c = createSharedCommunication();
    const unsubscribe = c.subscribe(onUpdate);

    return () => {
      unsubscribe();
      c.dispose();
    };
  }, []);
};
