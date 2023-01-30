import ReactDOM from "react-dom";
import React, { useEffect, useMemo } from "react";
import type { DecoratorFunction } from "@storybook/addons";
import { useGlobals, useParameter } from "@storybook/addons";
import { FIGMA_WRAPPER_CLASS, PARAM_KEY } from "../constants";
import { FigmaParams, FigmaParamsOptions } from "../types";
import { FigmaComparator } from "../components/FigmaComparator";
import { NoFigmaEnabled } from "../components/NoFigmaEnabled";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { getCurrentComponentNode } from "../utils/figma";

type ComparatorState = {
  compareWithFigma: boolean;
  hasFigmaComponent: boolean;
  isInDocs: boolean;
  figmaParams: FigmaParams;
  nodeId: string;
  fileId: string;
  comparatorOptions: FigmaParamsOptions
};

export const withFigmaComparator: DecoratorFunction = (StoryFn, context) => {
  const [globals] = useGlobals();
  const compareWithFigma = !!globals[PARAM_KEY];
  const figmaParams = useParameter<FigmaParams | undefined>("figma");
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

  const isInDocs = context.viewMode === "docs";
  useEffect(() => {
    // Execute your side effect here
    // For example, to manipulate the contents of the preview
    const selectorId = isInDocs
      ? `#anchor--${context.id} .docs-story`
      : `#root`;

    showFigmaImage(selectorId, {
      compareWithFigma,
      isInDocs,
      figmaParams,
      hasFigmaComponent,
      nodeId,
      fileId,
      comparatorOptions,
    });
  }, [compareWithFigma, figmaParams, fileId, nodeId, comparatorOptions]);

  return StoryFn();

  // return (
  //   <>
  //     <div style={compareWithFigma ? comparatorOptions?.componentStyle : null}>
  //       {StoryFn()}
  //     </div>
  //     <div className={FIGMA_WRAPPER_CLASS}>
  //       {compareWithFigma &&
  //         (hasFigmaComponent ? (
  //           <FigmaComparator
  //             fileId={fileId}
  //             nodeId={nodeId}
  //             currentComponentOptions={comparatorOptions}
  //             component={figmaParams?.component}
  //             options={figmaParams?.options}
  //           />
  //         ) : (
  //           <NoFigmaEnabled />
  //         ))}
  //     </div>
  //   </>
  // );
};

function showFigmaImage(selector: string, state: ComparatorState) {
  const rootElement = document.querySelector(selector);
  let figmaWrapper = rootElement.querySelector(
    `.${FIGMA_WRAPPER_CLASS}`
  ) as HTMLDivElement;

  if (state.compareWithFigma) {
    if (!figmaWrapper) {
      figmaWrapper = document.createElement("div");
      figmaWrapper.classList.add(FIGMA_WRAPPER_CLASS);
      rootElement.appendChild(figmaWrapper);
    }
  } else {
    figmaWrapper?.remove();
  }

  if (state.compareWithFigma) {
    ReactDOM.render(
      state.figmaParams?.component ? (
        <FigmaComparator
          fileId={state?.fileId}
          nodeId={state?.nodeId}
          currentComponentOptions={state?.comparatorOptions}
          component={state.figmaParams?.component}
          options={state.figmaParams?.options}
        />
      ) : (
        <NoFigmaEnabled />
      ),
      figmaWrapper
    );
  }
}
