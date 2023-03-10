import React, { useState, useMemo } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { ComparatorProps } from "../types";

export const FigmaComparator: React.FC<ComparatorProps> = ({
  fileId,
  nodeId,
  currentComponentOptions,
  options,
  context,
}) => {
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const [loading, componentSrc, error] = useMemo(() => {
    const data = context.globals.figma?.[`${fileId}--${nodeId}`];
    return [data?.loading || loadingImage, data?.src, data?.error];
  }, [context.globals?.figma, loadingImage]);

  return (
    <>
      <Container
        style={{
          ...options?.style,
          ...currentComponentOptions?.style,
        }}
      >
        {fileId && nodeId && (
          <img
            src={componentSrc}
            onLoad={() => setLoadingImage(false)}
            style={{ opacity: options?.opacity || 0.5 }}
          />
        )}
      </Container>
      <InfoContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && (
          <LoadingMessage>Loading image from Figma...</LoadingMessage>
        )}
      </InfoContainer>
    </>
  );
};

const Container = styled.div(({ style }: { style: object }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  zIndex: 9999,
  margin: "1rem",
  ...(style || {}),
}));

const InfoContainer = styled.div({
  position: "absolute",
  bottom: "1rem",
  left: "1rem",
});

const ErrorMessage = styled.div({
  color: convert(themes.normal).color.negative,
});

const LoadingMessage = styled.div({
  color: convert(themes.normal).color.positive,
});
