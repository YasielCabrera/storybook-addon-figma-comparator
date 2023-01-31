import React, { useEffect, useState } from "react";
import { styled } from "@storybook/theming";
import {
  FigmaComponent,
  FigmaComponentSet,
  isFigmaComponentWithOptions,
} from "../../types";
import { isFigmaComponentNode } from "../../types";
import { FigmaImage } from "./FigmaImage";

type ComponentImagesProps = {
  component: FigmaComponent | FigmaComponentSet;
};

export const ComponentImages: React.FC<ComponentImagesProps> = ({
  component,
}) => {
  const [images, setImages] = useState<[string, FigmaComponent][]>([]);

  useEffect(() => {
    if (typeof component === "string" || isFigmaComponentNode(component)) {
      setImages([["0", component]]);
    } else {
      const newImages = Object.entries(component)
        .filter((entry) => !Number.isNaN(Number(entry[0])))
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map((entry) =>
          isFigmaComponentWithOptions(entry[1])
            ? [entry[0], entry[1].component]
            : entry
        ) as [string, FigmaComponent][];
      setImages(newImages);
    }
  }, [component]);

  return (
    <Container>
      {images.map((image, index) => (
        <ImageWrapper key={`${index}-${image[1]}`}>
          <div>Viewport: {`>${image[0]}`}</div>
          <FigmaImage image={image[1]} />
        </ImageWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div({
  paddingTop: "1rem",
});

const ImageWrapper = styled.div({
  marginTop: "1em",
});
