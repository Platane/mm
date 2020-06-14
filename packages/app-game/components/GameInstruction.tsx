import { BaseHTMLAttributes } from "react";
import css from "@emotion/css";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { useTranslate } from "./_hooks/useTranslate";
import { titleFont } from "./typography";
import { useDelay } from "./_hooks/useDelay";

type Props = {
  step: "shuffle" | "win" | "firstPlay" | null;
} & BaseHTMLAttributes<any>;

export const GameInstruction = ({ step, ...props }: Props) => {
  const stepBefore = useDelay(step, 200);

  return (
    <>
      <Step {...props} key={step || ""} step={step} />

      {stepBefore !== step && (
        <Step
          {...props}
          key={stepBefore || ""}
          step={stepBefore}
          down={stepBefore !== "shuffle" && stepBefore !== step}
        />
      )}
    </>
  );
};

const Step = ({ step, ...props }: Props & { down?: boolean }) => {
  const { t } = useTranslate();

  switch (step) {
    case "shuffle":
      return <StepShuffle {...props}>{t("instruction.shuffle")}</StepShuffle>;

    case "win":
      return <StepWin {...props}>{t("instruction.win")}</StepWin>;

    case "firstPlay":
      return (
        <StepFirstPlay {...props}>{t("instruction.firstPlay")}</StepFirstPlay>
      );

    default:
      return null;
  }
};

const appear = keyframes`
  0%{
    opacity:0;
    transform: translateZ(-40px) rotateX(-50deg) scale(0.8,0.8);
  }
  100%{ 
    opacity:1;
    transform:  rotateX(-50deg);
  }
`;

const StepWin = styled.label<{ down?: boolean }>`
  white-space: nowrap;
  transform: rotateX(-50deg);
  ${titleFont}
  ${(p) =>
    p.down
      ? css`
          animation: ${appear} 220ms linear reverse;
        `
      : css`
          animation: ${appear} 180ms linear normal;
        `}
`;

const StepShuffle = StepWin;

const firstPlayAppear = keyframes`
  0%{
    opacity:0;
    transform: translateZ(-45px) rotateX(-50deg);
  }
  75%{
    opacity:0;
    transform: translateZ(-34px) rotateX(-50deg);
  }
  82%{
    opacity:1;
    transform: translateZ(0px) rotateX(-50deg);
  }
  95%{ 
    transform: translateZ(36px) rotateX(-50deg) scale(1.15,0.9);
  }
  100%{ 
    transform: translateZ(34px) rotateX(-50deg);
  }
`;

const firstPlayDisappear = keyframes`
0%{ 
  transform: translateZ(40px) rotateX(-50deg);
  opacity:1;
}
100%{ 
  transform: translateZ(-40px) rotateX(-50deg);
  opacity:0;
}
`;

const StepFirstPlay = styled.label<{ down?: boolean }>`
  transform: translateZ(40px) rotateX(-50deg);
  white-space: nowrap;
  ${titleFont}
  ${(p) =>
    p.down
      ? css`
          animation: ${firstPlayDisappear} 200ms linear;
        `
      : css`
          animation: ${firstPlayAppear} 600ms linear;
        `}
`;
