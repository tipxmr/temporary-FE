import { StreamerCard } from "./";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "StreamerCard",
  component: StreamerCard,
  argTypes: { handleClick: { action: "Clicked" } },
} as ComponentMeta<typeof StreamerCard>;

// Passing all the arguments to the button
const Template: ComponentStory<typeof StreamerCard> = (args) => (
  <StreamerCard {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  streamer: {
      name: "AlexAnarcho"
  },
};
