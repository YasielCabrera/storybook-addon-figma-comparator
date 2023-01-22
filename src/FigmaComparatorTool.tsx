import React, { useCallback } from "react";
import { useGlobals, useParameter } from "@storybook/api";
import { IconButton } from "@storybook/components";
import { TOOL_ID, PARAM_KEY } from "./constants";
import { FigmaOutline } from "./components/icons/FigmaOutline";
import { FigmaColors } from "./components/icons/FigmaColors";
import { FigmaParams } from "./types";

export const FigmaComparatorTool = () => {
  const [globals, updateGlobals] = useGlobals();
  const figmaParams = useParameter<FigmaParams | undefined>("figma");

  const compareWithFigma = globals[PARAM_KEY] || false;

  const toggleMyTool = useCallback(
    () =>
      updateGlobals({
        [PARAM_KEY]: !compareWithFigma,
      }),
    [compareWithFigma]
  );

  if (!figmaParams?.component) {
    return null;
  }

  return (
    <IconButton
      key={TOOL_ID}
      active={compareWithFigma}
      title="Compare With Figma"
      onClick={toggleMyTool}
    >
      {compareWithFigma ? (
        <FigmaColors height={12} />
      ) : (
        <FigmaOutline height={12} />
      )}
    </IconButton>
  );
};
