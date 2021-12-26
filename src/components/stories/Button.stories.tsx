import { MyButton } from "../../components";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Button",
  component: MyButton,
  argTypes: { handleClick: { action: "Clicked" } },
} as ComponentMeta<typeof MyButton>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof MyButton> = (args) => (
  <MyButton {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  label: "Press me",
};
