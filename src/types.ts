export type IconWidthType = {
  width?: string | number;
  height?: string | number;
};

export type FigmaNode = {
  fileId: string;
  nodeId: string;
};

export type FigmaComponentSet = {
  [key: number]: string | FigmaNode;
};

export type FigmaParamsOptions = {
  style?: React.CSSProperties;
  opacity?: number;
};

export type FigmaParams = {
  component: string | FigmaNode | FigmaComponentSet;
  options?: FigmaParamsOptions;
};

export type WindowSize = {
  width: number;
  height: number;
};

export function isFigmaNode(
  component: FigmaNode | unknown
): component is FigmaNode {
  const nodeComponent = component as FigmaNode;
  return (
    Object.keys(component).length === 2 &&
    !!nodeComponent.fileId &&
    !!nodeComponent.nodeId
  );
}
