import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import { NormalizeCss } from "@mm/app-game/components/NormalizeCss";
import { TypographyCss } from "@mm/app-game/components/typography";

const root = document.createElement("div");
document.body.appendChild(root);
root.id = "root";

render(
  <StrictMode>
    <NormalizeCss />
    <TypographyCss />
    <App />
  </StrictMode>,
  root
);

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  navigator.serviceWorker.register("../service-worker.js");
}
