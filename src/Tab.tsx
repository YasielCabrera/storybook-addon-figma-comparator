import React from "react";
import { useParameter } from "@storybook/api";
import { PARAM_KEY } from "./constants";
import { TabContent } from "./components/FigmaTab/TabContent";
import { FigmaParams } from "./types";

interface TabProps {
  active: boolean;
}

export const Tab: React.FC<TabProps> = ({ active }) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useparameter
  const figmaParams = useParameter<FigmaParams | undefined>("figma");

  return active ? <TabContent figmaParams={figmaParams} /> : null;
};
