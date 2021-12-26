import { Landing } from "../../pages";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Landing",
  component: Landing,
} as ComponentMeta<typeof Landing>;

const Template: ComponentStory<typeof Landing> = () => <Landing />;

export const Basic = Template.bind({});
Basic.args = {};
