import css from "@emotion/css";

export const bright = "#ff9f1c";
export const brightShade = "#f3722c";
export const brightLight = "#fff1e6";

export const background = "#ffb4a2";
export const backgroundShade = "#e6beae";

export const theme_color = bright;

export const backgroundStyle = css`
  background-image: radial-gradient(
    ellipse at center,
    ${backgroundShade}00 0,
    ${backgroundShade}77 130%
  );
  background-color: ${background};
`;
