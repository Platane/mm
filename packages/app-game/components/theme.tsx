import { css } from "@emotion/core";

export const palette = ["#7d5a5a", "#f1d1d1", "#f3e1e1", "#faf2f2"];

export const boardColor = "#aaa";
export const boardColorAlternative = "#bbb";

export const background = "#f24b55";
export const theme_color = background;

export const backgroundStyle = css`
  background-image: radial-gradient(
    ellipse at center,
    rgba(99, 36, 40, 0) 0,
    rgba(99, 36, 40, 0.5) 130%
  );
  background-color: ${background};
`;
