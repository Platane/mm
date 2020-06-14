import css from "@emotion/css";

export const boardColor = "#dad2bc";

export const bright = "#2ec4b6";
export const brightShade = "#2aa89c";
export const brightLight = "#fdfffc";

export const background = "#eee4e1";
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
