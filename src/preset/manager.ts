import { addons, types } from "@storybook/addons";

import { ADDON_ID, TOOL_ID, PANEL_ID, TAB_ID } from "../constants";
import { FigmaComparatorTool } from "../FigmaComparatorTool";
import { Panel } from "../Panel";
import { Tab } from "../Tab";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Figma Comparator",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: FigmaComparatorTool,
  });

  // Register the panel
  // addons.add(PANEL_ID, {
  //   type: types.PANEL,
  //   title: "My addon",
  //   match: ({ viewMode }) => viewMode === "story",
  //   render: Panel,
  // });

  // Register the tab
  addons.add(TAB_ID, {
    type: types.TAB,
    title: "Figma",
    //👇 Checks the current route for the story
    route: ({ storyId }) => `/figma/${storyId}`,
    //👇 Shows the Tab UI element in myaddon view mode
    match: ({ viewMode }) => viewMode === "figma",
    render: Tab,
  });
});
