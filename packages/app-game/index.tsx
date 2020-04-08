import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import { RouterProvider } from "./components/_hooks/useRouter";
import { GameConfigProvider } from "./components/_hooks/useGameConfig";
import { ColorSchemeProvider } from "./components/_hooks/useColorScheme";
import { NormalizeCss } from "./components/NormalizeCss";

const root = document.createElement("div");
document.body.appendChild(root);
root.id = "root";

render(
  <StrictMode>
    <GameConfigProvider>
      <ColorSchemeProvider>
        <RouterProvider>
          <NormalizeCss />
          <App />
        </RouterProvider>
      </ColorSchemeProvider>
    </GameConfigProvider>
  </StrictMode>,
  root
);

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  navigator.serviceWorker.register("service-worker.js");
}
