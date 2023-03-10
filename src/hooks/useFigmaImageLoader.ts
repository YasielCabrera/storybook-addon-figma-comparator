import { useGlobals, useStorybookApi } from "@storybook/api";
import { useEffect, useMemo, useState } from "react";
import { FigmaParams, isFigmaComponentNode } from "../types";
import { getFigmaImage } from "../utils/figma";
import { componentKey } from "../utils/keys";
import useRightFigmaParamsViewport from "./useRightFigmaParamsViewport";

const useFigmaImageLoader = () => {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();
  const storyId = useMemo(
    () => api.getCurrentStoryData()?.id,
    [api.getCurrentStoryData()]
  );

  const [currentFigmaParams, setCurrentFigmaParams] = useState<FigmaParams>();
  const [fileId, nodeId] = useRightFigmaParamsViewport(currentFigmaParams);
  const FIGMA_VARIABLE_CACHE_KEY = componentKey(fileId, nodeId);

  useEffect(() => {
    if (storyId) {
      const currentStoryParams =
        api.getCurrentParameter<{ figma: FigmaParams }>();
      setCurrentFigmaParams(currentStoryParams.figma);
    }
  }, [storyId]);

  const updateCurrentGlobals = (newGlobals: any) => {
    updateGlobals({
      figma: {
        ...globals.figma,
        [FIGMA_VARIABLE_CACHE_KEY]: {
          ...globals.figma?.[FIGMA_VARIABLE_CACHE_KEY],
          ...newGlobals,
        },
      },
    });
  };

  useEffect(() => {
    if (fileId && nodeId) {
      if (!globals.figma?.[FIGMA_VARIABLE_CACHE_KEY]?.loading) {
        // this file is not loaded or is not being loaded
        updateCurrentGlobals({ loading: true });
        let src: string;
        let error: string;
        getFigmaImage({ fileId, nodeId })
          .then((imageUrl) => {
            if (imageUrl) {
              src = imageUrl;
            } else {
              error =
                "The configured image for the current viewport width is invalid or can not be fetched.";
            }
          })
          .catch((e) => {
            error = e.toString();
          })
          .finally(() => {
            updateCurrentGlobals({ loading: false, error, src });
          });
      }
    } else {
      let errorMessage = "There is not image configured for this component.";
      if (
        !isFigmaComponentNode(currentFigmaParams?.component) &&
        typeof currentFigmaParams?.component !== "string"
      ) {
        errorMessage =
          "There is not image configured for the current viewport width";
      }
      updateCurrentGlobals({
        loading: false,
        error: errorMessage,
        src: null,
      });
    }
  }, [fileId, nodeId]);

  return {
    loading: globals.figma?.[FIGMA_VARIABLE_CACHE_KEY]?.loading,
    src: globals.figma?.[FIGMA_VARIABLE_CACHE_KEY]?.src,
    error: globals.figma?.[FIGMA_VARIABLE_CACHE_KEY]?.error,
  };
};

export default useFigmaImageLoader;
