import React from "react";
import { Button } from "./Button";

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
    component:
      "https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10486%3A103217&t=rZgNKjWVAVo99Z9K-4",
  },
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
  },
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
    },
  },
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
