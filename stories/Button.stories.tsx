import React from "react";
import { Button } from "./Button";
import type { FigmaParams } from "../src/types";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    figma: {
      component: {
        fileId: "fileID_G",
        nodeId: "nodeID_G",
      },
      options: {
        style: {
          padding: 8,
        },
      },
    },
    myAddonParameter: `
<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>
  <SomeOtherComponent funcProp={(a) => a.id} />
</MyComponent>
`,
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};
Primary.parameters = {
  figma: {
    component: {
      0: "https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103217",
      500: {
        component:
          "https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103217",
        options: {
          style: {
            background: "#ff000055",
          },
          componentStyle: {
            background: "#ffff0055",
          },
        },
      },
      700: {
        component:
          "https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103217",
        options: {
          style: {
            background: "#ff00ff55",
          },
          componentStyle: {
            background: "#4400ff55",
          },
        },
      },
      1000: {
        component:
          "https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103217",
        options: {
          style: {
            background: "#04ff0055",
          },
          componentStyle: {
            background: "#ff048855",
            width: 600,
            '& > *': {
              border: '1px solid red'
            }
          },
        },
      },
    },
  } as FigmaParams,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};
Secondary.parameters = {
  figma: {
    component: {
      fileId: "fileID",
      nodeId: "nodeID",
    },
  } as FigmaParams,
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};
Large.parameters = {
  figma: {
    component: {
      // 0: "https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=11486%3A103217&t=rZgNKjWVAVo99Z9K-4",
      500: "https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=12486%3A103217&t=rZgNKjWVAVo99Z9K-4",
      800: "https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13486%3A103217&t=rZgNKjWVAVo99Z9K-4",
      900: {
        component: {
          fileId: "fileID",
          nodeId: "nodeID",
        },
        options: {
          style: {},
        },
      },
    },
  } as FigmaParams,
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
