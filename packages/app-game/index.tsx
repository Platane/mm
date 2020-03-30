import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import { ColorSchemeProvider } from "../app-cheater/components/_hooks/useColorScheme";
import { GameConfigProvider } from "../app-cheater/components/_hooks/useGameConfig";
import { NormalizeCss } from "../app-cheater/components/NormalizeCss";

const root = document.createElement("div");
document.body.appendChild(root);
root.id = "root";

render(
  <StrictMode>
    <ColorSchemeProvider>
      <GameConfigProvider>
        <NormalizeCss />
        <App />
      </GameConfigProvider>
    </ColorSchemeProvider>
  </StrictMode>,
  root
);

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}
