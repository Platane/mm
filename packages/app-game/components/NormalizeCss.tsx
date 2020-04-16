import { Global, css } from "@emotion/core";

const normalized = css`
  html {
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  #root,
  html,
  body {
    margin: 0;
    min-height: 100%;
    height: 100%;
    overflow-x: hidden;
  }
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

export const NormalizeCss = () => <Global styles={normalized} />;
