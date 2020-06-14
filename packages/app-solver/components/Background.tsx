import styled from "@emotion/styled";
import { skullPath } from "./Skull";

const margin = 0.2;

export const Background = () => (
  <>
    <Container
      viewBox={[-margin, -margin, margin * 2 + 1, margin * 2 + 1].join(" ")}
    >
      <path d={skullPath} />
    </Container>

    <Footer>
      <label>
        Skull icon by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>
      </label>
    </Footer>
  </>
);

const Footer = styled.footer`
  position: fixed;
  bottom: 2px;
  right: 4px;

  transform: scale(0.7);
  display: block;
  transform-origin: right bottom;
`;

const Container = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80%;
  width: 100%;
  max-height: 520px;
  z-index: -1;

  fill: #fff1;
`;
