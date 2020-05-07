import { Global, css } from "@emotion/core";

import milkshake_otf from "../assets/fonts/Milkshake/Milkshake.otf";
import milkshake_ttf from "../assets/fonts/Milkshake/Milkshake.ttf";
import { bright, brightShade, brightLight } from "./theme";

const fontFace = css`
  @font-face {
    font-family: Milkshake;
    src: url(${milkshake_ttf}) format("truetype"),
      url(${milkshake_otf}) format("otf");
  }
`;

export const createLongShadow = (colors: string[], m = 1, px = 1, py = 1) =>
  `text-shadow:${colors
    .map((c) => Array.from({ length: m }, () => c))
    .flat()
    .map((c, i) => `${i * px}px ${i * py}px 0 ${c}`)
    .join(",")};`;

export const createHallo = (colors: string[], m = 1, k = 5) =>
  `text-shadow:${colors
    .map((c, i) =>
      Array.from(
        { length: k },
        (_, j) =>
          `${m * (i + 1) * Math.cos((j / k) * Math.PI * 2)}px ` +
          `${m * (i + 1) * Math.sin((j / k) * Math.PI * 2)}px ` +
          `0 ` +
          `${c}`
      )
    )
    .flat()
    .join(",")};`;

export const bodyFont = css`
  font-family: helvetica, arial;
  color: #111;
  font-size: 20px;
`;
export const titleFont = css`
  color: ${bright};
  font-size: 48px;
  font-family: Milkshake;
  letter-spacing: 4px;
  ${createHallo([brightShade, brightLight, brightLight], 2.1, 20)}

  @media (max-width: 500px) {
    font-size: 38px;
    letter-spacing: 3.2px;
  }
`;

const typography = css`
  ${fontFace}

  input,
  label,
  a {
    ${bodyFont}
  }
  html,
  a {
    color: #111;
  }
  a:hover {
    transition: color 120ms;
    color: #454455;
  }
`;

export const TypographyCss = () => <Global styles={typography} />;
