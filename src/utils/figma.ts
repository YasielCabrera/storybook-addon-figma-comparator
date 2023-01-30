import * as Figma from "figma-js";
import {
  FigmaComponent,
  FigmaComponentNode,
  FigmaComponentSet,
  FigmaComponentWithOptions,
  isFigmaComponentNode,
  isFigmaComponentWithOptions,
} from "../types";

const FIGMA_TOKEN = process.env.STORYBOOK_FIGMA_ACCESS_TOKEN;
const figmaClient = Figma.Client({ personalAccessToken: FIGMA_TOKEN });

export async function getFigmaImage(
  componentNode: FigmaComponentNode
): Promise<string> {
  try {
    const { data } = await figmaClient.fileImages(componentNode.fileId, {
      ids: [componentNode.nodeId],
      format: "svg",
    });
    return data.images[componentNode.nodeId];
  } catch (err) {
    // reject promise
    throw new Error("Figma image not found");
  }
}

export function getCurrentComponentNode(
  component: FigmaComponent | FigmaComponentWithOptions | FigmaComponentSet,
  viewportWidth: number,
  options?: unknown
): FigmaComponentWithOptions<FigmaComponentNode> | undefined {
  if (typeof component === "string") {
    const url = new URL(component);
    const nodeId = url.searchParams.get("node-id");
    const fileId = url.pathname.split("/")[2];
    if (!nodeId || !fileId) {
      throw new Error("Invalid Figma link");
    }
    return {
      component: {
        nodeId,
        fileId,
      },
      options,
    };
  } else if (isFigmaComponentNode(component)) {
    return {
      component,
    };
  } else if (isFigmaComponentWithOptions(component)) {
    return getCurrentComponentNode(
      component.component,
      viewportWidth,
      component.options
    );
  } else {
    const sortedBreakpoints = Object.keys(component)
      .map((key) => parseInt(key))
      .sort((a, b) => a - b);

    let index = sortedBreakpoints.length - 1;
    while (index >= 0) {
      if (sortedBreakpoints[index] <= viewportWidth) {
        const viewportComponent = component[sortedBreakpoints[index]];
        return getCurrentComponentNode(viewportComponent, viewportWidth);
      }
      index--;
    }
  }
}
