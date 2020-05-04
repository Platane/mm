import { Global, css } from "@emotion/core";

const typography = css`
  input,
  label {
    font-family: helvetica, arial;
    font-size: 20px;
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
