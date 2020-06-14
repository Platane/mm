// / <reference path='../builder/assets.d.ts'/>

import { StrictMode, Suspense } from "react";
import { render } from "react-dom";
import { App } from "./components/App";
import { NormalizeCss } from "./components/NormalizeCss";
import { TypographyCss } from "./components/typography";

const root = document.createElement("div");
document.body.appendChild(root);
root.id = "root";

render(
  <StrictMode>
    <TypographyCss />
    <NormalizeCss />
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
  root
);

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  navigator.serviceWorker.register("../service-worker.js");
}
