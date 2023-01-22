import React, { useEffect, useState } from "react";
import { styled } from "@storybook/theming";
import { Button } from "@storybook/components";
import type { FigmaNode } from "../../types";
import { getFigmaImage } from "../../utils/figma";

type FigmaImage = {
  image: string | FigmaNode;
};

export const FigmaImage: React.FC<FigmaImage> = ({ image }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    let node;
    if (typeof image === "string") {
      const url = new URL(image);
      const nodeId = url.searchParams.get("node-id");
      const fileId = url.pathname.split("/")[2];
      if (!nodeId || !fileId) {
        setError("Invalid link image");
        return;
      }
      node = {
        nodeId,
        fileId,
      };
    } else {
      node = image;
    }
    getFigmaImage(node)
      .then((image: string) => {
        if (image) {
          setImageSrc(image);
        } else {
          setError("Figma image not found.");
        }
        setImageLoaded(true);
      })
      .catch((err) => {
        setError(err.message || "Error fetching the image src from Figma");
        setImageLoaded(true);
      });
  }, [image]);

  if (!imageSrc && !imageLoaded) {
    return <Loading>Loading image...</Loading>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  return (
    <ImageContainer>
      <ImageWrapper>
        <img src={imageSrc} onLoad={() => setImageLoaded(false)} />
      </ImageWrapper>
      <ImageActions>
        <Button
          href={imageSrc}
          target="_blank"
          isLink
          outline
          style={{ marginRight: "1rem" }}
        >
          View Image
        </Button>
        {typeof image === "string" && (
          <Button href={image} target="_blank" isLink outline>
            View on Figma
          </Button>
        )}
      </ImageActions>
    </ImageContainer>
  );
};

const ImageContainer = styled.div(({ theme }) => ({
  padding: "1em",
  borderRadius: "3px",
  boxShadow: `${theme.input.border} 0 0 0 1px inset`,
}));

const ImageWrapper = styled.div({});

const ImageActions = styled.div({
  marginTop: "1rem",
});

const ErrorMessage = styled.div(({ theme }) => ({
  color: theme.color.negative,
  padding: "2em",
  borderRadius: "3px",
  boxShadow: `${theme.input.border} 0 0 0 1px inset`,
}));

const Loading = styled.div(({ theme }) => ({
  color: theme.color.positive,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2em",
  borderRadius: "3px",
  boxShadow: `${theme.input.border} 0 0 0 1px inset`,
}));
