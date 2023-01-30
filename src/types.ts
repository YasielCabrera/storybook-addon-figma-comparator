export type IconWidthType = {
  width?: string | number;
  height?: string | number;
};

export type FigmaComponentNode = {
  fileId: string;
  nodeId: string;
};

export type FigmaComponentLink = string;

export type FigmaComponent = FigmaComponentNode | FigmaComponentLink;

export type FigmaComponentWithOptions<
  T extends FigmaComponent = FigmaComponent
> = {
  component: T;
  options?: FigmaParamsOptions;
};

export type FigmaComponentSet = {
  [key: number]: FigmaComponent | FigmaComponentWithOptions;
};

export type FigmaParamsOptions = {
  style?: React.CSSProperties;
  componentStyle?: React.CSSProperties;
  opacity?: number;
};

export type FigmaParams = {
  component: FigmaComponent | FigmaComponentSet;
  options?: FigmaParamsOptions;
};

export type ComparatorProps = {
  component: FigmaComponent | FigmaComponentSet;
  nodeId: string;
  fileId: string;
  options?: FigmaParamsOptions;
  currentComponentOptions?: FigmaParamsOptions;
};

export type WindowSize = {
  width: number;
  height: number;
};

export function isFigmaComponentNode(
  component: FigmaComponentNode | unknown
): component is FigmaComponentNode {
  const nodeComponent = component as FigmaComponentNode;
  return (
    Object.keys(component).length === 2 &&
    !!nodeComponent.fileId &&
    !!nodeComponent.nodeId
  );
}

export function isFigmaComponentWithOptions(
  component: FigmaComponentWithOptions | unknown
): component is FigmaComponentWithOptions {
  const componentWithOptions = component as FigmaComponentWithOptions;
  return !!componentWithOptions.component;
}
