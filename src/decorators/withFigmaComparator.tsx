import React, { useMemo } from "react";
import type { DecoratorFunction } from "@storybook/addons";
import { FIGMA_WRAPPER_CLASS, PARAM_KEY } from "../constants";
import { FigmaParams } from "../types";
import { FigmaComparator } from "../components/FigmaComparator";
import { NoFigmaEnabled } from "../components/NoFigmaEnabled";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { getCurrentComponentNode } from "../utils/figma";

export const withFigmaComparator: DecoratorFunction = (StoryFn, context) => {
  const compareWithFigma = !!context.globals[PARAM_KEY];
  const figmaParams = context.parameters?.figma as FigmaParams;
  const hasFigmaComponent = !!figmaParams?.component;

  const windowSize = useWindowWidth();
  const [fileId, nodeId, comparatorOptions] = useMemo(() => {
    if (!figmaParams) {
      return [null, null, null];
    }
    const figmaNode = getCurrentComponentNode(
      figmaParams?.component,
      windowSize.width
    );
    return [
      figmaNode?.component?.fileId,
      figmaNode?.component?.nodeId,
      figmaNode?.options,
    ];
  }, [figmaParams, windowSize]);

  return (
    <>
      <div style={compareWithFigma ? comparatorOptions?.componentStyle : null}>
        {StoryFn()}
      </div>
      <div className={FIGMA_WRAPPER_CLASS}>
        {compareWithFigma &&
          (hasFigmaComponent ? (
            <FigmaComparator
              fileId={fileId}
              nodeId={nodeId}
              currentComponentOptions={comparatorOptions}
              component={figmaParams?.component}
              options={figmaParams?.options}
            />
          ) : (
            <NoFigmaEnabled />
          ))}
      </div>
    </>
  );
};
