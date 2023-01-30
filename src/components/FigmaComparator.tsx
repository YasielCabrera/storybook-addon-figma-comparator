import React, { useState, useEffect } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { ComparatorProps, isFigmaComponentNode } from "../types";
import { getFigmaImage } from "../utils/figma";

export const FigmaComparator: React.FC<ComparatorProps> = ({
  component,
  fileId,
  nodeId,
  currentComponentOptions,
  options,
}) => {
  const [componentSrc, setComponentSrc] = useState<string | undefined>();

  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (fileId && nodeId) {
      setLoadingImage(true);
      setError(undefined);
      getFigmaImage({ fileId, nodeId })
        .then((imageUrl) => {
          if (imageUrl) {
            setComponentSrc(imageUrl);
          } else {
            setLoadingImage(false);
            setError(
              "The configured image for the current viewport width is invalid or can not be fetched."
            );
          }
        })
        .catch((error) =>
          setError(`An error ocurred while loading the image. "${error}"`)
        );
    } else {
      let errorMessage = "There is not image configured for this component.";
      if (!isFigmaComponentNode(component) && typeof component !== "string") {
        errorMessage =
          "There is not image configured for the current viewport width";
      }
      setError(errorMessage);
    }
  }, [fileId, nodeId]);

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
        {loadingImage && (
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
