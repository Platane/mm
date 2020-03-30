import { render } from "react-dom";
import { App } from "./components/App";
import { ColorSchemeProvider } from "./components/_hooks/useColorScheme";
import { GameConfigProvider } from "./components/_hooks/useGameConfig";
import { NormalizeCss } from "./components/NormalizeCss";

const root = document.createElement("div");
document.body.appendChild(root);
root.id = "root";

render(
  <ColorSchemeProvider>
    <GameConfigProvider>
      <NormalizeCss />
      <App />
    </GameConfigProvider>
  </ColorSchemeProvider>,
  root
);
