import { render } from "react-dom";
import { App } from "./components/App";
import { ColorSchemeProvider } from "./components/_hooks/useColorScheme";
import { NormalizeCss } from "./components/NormalizeCss";

render(
  <ColorSchemeProvider>
    <NormalizeCss />
    <App />
  </ColorSchemeProvider>,
  document.body
);
