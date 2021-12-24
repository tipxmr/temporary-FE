import { Landing } from "../../pages";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Landing",
  component: Landing,
} as ComponentMeta<typeof Landing>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof Landing> = (args) => (
  <Landing {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
};
