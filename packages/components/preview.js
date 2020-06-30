import React from "react";
import { ThemeProvider } from "theme-ui";
import { addDecorator } from "@storybook/react";

import theme from "./src/theme";

const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

addDecorator(renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>);
