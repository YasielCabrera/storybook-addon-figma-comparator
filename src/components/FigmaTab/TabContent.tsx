import React from "react";
import { styled } from "@storybook/theming";
// import { Title, Source } from "@storybook/components";
import { FigmaParams } from "../../types";
import { ComponentImages } from "./ComponentImages";

interface TabContentProps {
  figmaParams: FigmaParams;
}

export const TabContent: React.FC<TabContentProps> = ({ figmaParams }) => {
  if (!figmaParams?.component) {
    return (
      <TabWrapper>
        <TabInner>
          <h1>Figma Comparator</h1>
          <p>
            This component/variant is not configured to use the Figma
            Comparator.
          </p>
        </TabInner>
      </TabWrapper>
    );
  }

  return (
    <TabWrapper>
      <TabInner>
        <h1>Figma Comparator</h1>

        {figmaParams?.component && (
          <>
            <p>Figma Data:</p>
            {/* <Source
              code={JSON.stringify(figmaParams?.component, null, 2)}
              language="json"
              format={true}
            /> */}
          </>
        )}

        {figmaParams?.options && (
          <>
            <p>Comparator options:</p>
            {/* <Source
              code={JSON.stringify(figmaParams?.options, null, 2)}
              language="json"
              format={true}
            /> */}
          </>
        )}

        <h2>Images:</h2>
        <ComponentImages component={figmaParams.component} />
      </TabInner>
    </TabWrapper>
  );
};

const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  padding: "4rem 20px",
  minHeight: "100vh",
  boxSizing: "border-box",
}));

const TabInner = styled.div({
  maxWidth: 1000,
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
});
