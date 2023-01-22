import React from "react";
import ReactDOM from "react-dom";
import type { DecoratorFunction } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";
import { FIGMA_WRAPPER_CLASS, PARAM_KEY } from "../constants";
import { FigmaParams } from "../types";
import { FigmaComparator } from "../components/FigmaComparator";
import { NoFigmaEnabled } from "../components/NoFigmaEnabled";

type ComparatorState = {
  compareWithFigma: boolean;
  hasFigmaComponent: boolean;
  isInDocs: boolean;
  figmaParams: FigmaParams;
};
export const withFigmaComparator: DecoratorFunction = (StoryFn, context) => {
  const [globals] = useGlobals();
  const compareWithFigma = globals[PARAM_KEY];
  const figmaParams = context.parameters?.figma as FigmaParams;
  const hasFigmaComponent = !!figmaParams?.component;

  // Is the addon being used in the docs panel
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
    });
  }, [compareWithFigma, figmaParams]);

  return StoryFn();
};

const renderTesting = (selector: string, state: any) => {
  const rootElement = document.querySelector(selector);

  let preElement = rootElement.querySelector("pre");
  if (!preElement) {
    preElement = document.createElement("pre");
    preElement.style.setProperty("margin-top", "2rem");
    preElement.style.setProperty("padding", "1rem");
    preElement.style.setProperty("background-color", "#eee");
    preElement.style.setProperty("border-radius", "3px");
    preElement.style.setProperty("max-width", "600px");
    rootElement.appendChild(preElement);
  }

  preElement.innerText = `State data:

${JSON.stringify(state, null, 2)}
`;
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
          component={state.figmaParams?.component}
          options={state.figmaParams?.options}
        />
      ) : (
        <NoFigmaEnabled />
      ),
      figmaWrapper
    );
  }

  // renderTesting(selector, state);
}
