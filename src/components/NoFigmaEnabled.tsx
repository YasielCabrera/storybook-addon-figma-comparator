import React from "react";
import { styled, themes, convert } from "@storybook/theming";

export const NoFigmaEnabled: React.FC = () => {
    return <Container>Figma Comparator is not configured for this Story</Container>
}

const Container = styled.div({
    position: "absolute",
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: "#000000cc",
    fontSize: 24,
    fontWeight: 'bold',
    color: convert(themes.normal).color.primary
  });