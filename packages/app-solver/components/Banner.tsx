import styled from "@emotion/styled";
import { bright, brightShade, brightLight } from "./theme";
import { useTranslate } from "./_hooks/useTranslate";
import { bodyFont } from "@mm/app-game/components/typography";

export const Banner = () => {
  const { t } = useTranslate();

  return <Container>⚡ {t("connected_to_game_in_other_window")}</Container>;
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  padding: 4px 10px;

  background: ${bright};
  box-shadow: 0 1px 0 0px ${brightShade};
  pointer-events: auto;
  
  
  ${bodyFont}
  
  color: ${brightLight};

  display: flex;
  justify-content: center;
  align-items: center;
`;
