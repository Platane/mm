import styled from "@emotion/styled";
import { useColorScheme } from "./_hooks/useColorScheme";
import { colorNames } from "./color";

export const SwitchColorScheme = () => {
  const { colorName, toggleColorScheme } = useColorScheme();

  return (
    <Container>
      <button onClick={toggleColorScheme}>change</button>
    </Container>
  );
};

const Container = styled.div``;
