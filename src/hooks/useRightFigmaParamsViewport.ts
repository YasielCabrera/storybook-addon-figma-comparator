import { useMemo } from "react";
import { FigmaParams, FigmaParamsOptions } from "../types";
import { useWindowWidth } from "./useWindowWidth";
import { getCurrentComponentNode } from "../utils/figma";

const useRightFigmaParamsViewport = (
  figmaParams: FigmaParams
): [string, string, FigmaParamsOptions] => {
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

  return [fileId, nodeId, comparatorOptions];
};

export default useRightFigmaParamsViewport;
