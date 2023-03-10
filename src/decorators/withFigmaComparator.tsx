import React from "react";
import type { DecoratorFunction } from "@storybook/addons";
import { FIGMA_WRAPPER_CLASS, PARAM_KEY } from "../constants";
import { FigmaParams } from "../types";
import { FigmaComparator } from "../components/FigmaComparator";
import { NoFigmaEnabled } from "../components/NoFigmaEnabled";
import useRightFigmaParamsViewport from "../hooks/useRightFigmaParamsViewport";

export const withFigmaComparator: DecoratorFunction = (StoryFn, context) => {
  const compareWithFigma = !!context.globals[PARAM_KEY];
  const figmaParams = context.parameters?.figma as FigmaParams;
  const hasFigmaComponent = !!figmaParams?.component;

  const [fileId, nodeId, comparatorOptions] =
    useRightFigmaParamsViewport(figmaParams);

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
              options={figmaParams?.options}
              context={context}
            />
          ) : (
            <NoFigmaEnabled />
          ))}
      </div>
    </>
  );
};
