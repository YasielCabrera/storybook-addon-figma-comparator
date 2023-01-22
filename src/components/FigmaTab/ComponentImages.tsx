import React, { useEffect, useState } from "react";
import { styled } from "@storybook/theming";
import type { FigmaNode, FigmaComponentSet } from "../../types";
import { getFigmaImage } from "../../utils/figma";
import { isFigmaNode } from "../../types";
import { FigmaImage } from "./FigmaImage";

type ComponentImagesProps = {
  component: string | FigmaNode | FigmaComponentSet;
};

export const ComponentImages: React.FC<ComponentImagesProps> = ({
  component,
}) => {
  const [images, setImages] = useState<[string, string | FigmaNode][]>([]);

  useEffect(() => {
    if (typeof component === "string" || isFigmaNode(component)) {
      setImages([[0, component]]);
    } else {
      const keys = Object.keys(component);
      const newImages = Object.entries(component)
        .filter((entry) => !Number.isNaN(Number(entry[0])))
        .sort((a, b) => Number(a[0]) - Number(b[0]));
      setImages(newImages);
    }
  }, [component]);

  return (
    <Container>
      {images.map((image, index) => (
        <ImageWrapper key={image[1].toString()}>
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
