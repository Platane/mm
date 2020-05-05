import styled from "@emotion/styled";
import { bodyFont } from "./typography";
import { bright, brightLight, brightShade } from "./theme";

export const Button = styled.button`
  border: none;
  background: ${bright};
  box-shadow: 1px 1px 0 0 ${brightShade}, 2px 2px 0 0 ${brightShade},
    3px 2px 0 0 ${brightShade};
  box-shadow: 0 0 0 1px ${brightShade};
  border-radius: 2px;
  pointer-events: auto;
  padding: 16px;
  min-width:140px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${bodyFont}
  
  color: ${brightLight};
`;
