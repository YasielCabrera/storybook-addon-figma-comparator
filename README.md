# Storybook Addon Figma Comparator

Compare components with Figma Components

## How to install

```cmd
npm install --dev storybook-addon-figma-comparator

# or

yarn add -D storybook-addon-figma-comparator
```

```js
// .storybook/main.js

// ...
module.exports = {
  // ...
  addons: [
    // ...
    'storybook-addon-figma-comparator',
  ],
}
```

You need to add your Figma token with access to the Figma files to the environment variable `STORYBOOK_FIGMA_ACCESS_TOKEN`.

## How to use

Basic usage:

```js
// ...
export default {
  title: "Example/Button",
  component: Button,
  // ...
}

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};
Primary.parameters = {
  figma: {
    component:
      "https://www.figma.com/file/ZZZ/file-name?node-id=XXX%3AYYY",
  } as FigmaParams,
};
```

## `Figma` Parameter

```ts
figma = {
  component: FigmaComponent | FigmaComponentSet;
  options?: {
    style?: React.CSSProperties;
    componentStyle?: React.CSSProperties;
    opacity?: number;
  };
}

FigmaComponentNode = {
  fileId: string;
  nodeId: string;
}

FigmaComponent = string | FigmaComponentNode;

FigmaComponentSet = {
  [key: number]: FigmaComponent;
};
```

The `component` can be a `string` indicating the URL of the Figma component, a Figma node indicating the file id and the node id (component id) or it can be a Component set in cases where the component changes in different viewpoints.

### Component set example

```js
// ...
Primary.parameters = {
  figma: {
    component: {
        0: node1,
        768: node2,
        1440: node3
    }
  },
};

// the nodes can have any of the following formats:
node1 = "https://www.figma.com/file/ZZZ/file-name?node-id=XXX%3AYYY";
node2 = {
  fileId: "ZZZ",
  nodeId: "XXX:YYY"
}
node3 = {
  // the component can be a string or a FigmaComponentNode like `node1` or `node2`
  component: "https://www.figma.com/file/ZZZ/file-name?node-id=XXX%3AYYY",
  // this options will override the component `options`
  options: {
    style: {
      // figma component options
      padding: 12,
    },
    componentStyle: {
      // story component options. This way you can set a fixed width to match exactly with the Figma image
      width: 650,
    },
  }
}
```

In the previous example, the Figma comparator will fetch the Figma image of the component if the viewport width is between 0 and 767, the image from node 2 if the viewport width is between 768 and 1439 and the image from the node 3 if the viewport width is greater than 1440.

### Development scripts

- `yarn start` runs babel in watch mode and starts Storybook
- `yarn build` build and package your addon code
