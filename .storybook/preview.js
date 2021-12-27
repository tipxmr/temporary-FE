import { createTheme, ThemeProvider } from "@mui/material/styles";
import { addDecorator } from "@storybook/react";
import { withThemes } from "@react-theming/storybook-addon";
import tipxmrTheme from "../src/theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme(tipxmrTheme)

// FIXME: SB in combination with MUI themes isn't working as intended
// https://github.com/react-theming/storybook-addon/issues/39
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
