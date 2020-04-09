import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import { GameConfigProvider } from "../app-game/components/_hooks/useGameConfig";
import { ColorSchemeProvider } from "../app-game/components/_hooks/useColorScheme";
import { NormalizeCss } from "../app-game/components/NormalizeCss";

const root = document.createElement("div");
document.body.appendChild(root);
root.id = "root";

render(
  <StrictMode>
    <GameConfigProvider>
      <ColorSchemeProvider>
        <NormalizeCss />
        <App />
      </ColorSchemeProvider>
    </GameConfigProvider>
  </StrictMode>,
  root
);

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  navigator.serviceWorker.register("../service-worker.js");
}
