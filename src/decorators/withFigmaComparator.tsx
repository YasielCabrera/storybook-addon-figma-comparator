import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import type { DecoratorFunction } from "@storybook/addons";
import { useGlobals, useParameter } from "@storybook/addons";
import { FIGMA_WRAPPER_CLASS, PARAM_KEY } from "../constants";
import { FigmaParams } from "../types";
import { FigmaComparator } from "../components/FigmaComparator";
import { NoFigmaEnabled } from "../components/NoFigmaEnabled";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { getCurrentComponentNode } from "../utils/figma";

type ComparatorState = {
  compareWithFigma: boolean;
  hasFigmaComponent: boolean;
  isInDocs: boolean;
  figmaParams: FigmaParams;
  windowWidth: number;
};

export const withFigmaComparator: DecoratorFunction = (StoryFn, context) => {
  const [globals] = useGlobals();
  const compareWithFigma = !!globals[PARAM_KEY];
  const figmaParams = useParameter<FigmaParams | undefined>("figma");
  const hasFigmaComponent = !!figmaParams?.component;

  const { width: windowWidth } = useWindowWidth();

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
      windowWidth,
    });
  }, [compareWithFigma, figmaParams, windowWidth]);

  return StoryFn();

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
    const figmaNode = getCurrentComponentNode(
      state?.figmaParams?.component,
      state.windowWidth
    );
    Object.assign((rootElement as HTMLDivElement).style, figmaNode?.options?.componentStyle || {})

    ReactDOM.render(
      state.figmaParams?.component ? (
        <FigmaComparator
          fileId={figmaNode?.component?.fileId}
          nodeId={figmaNode?.component?.nodeId}
          currentComponentOptions={figmaNode?.options}
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
