import React from "react";
import { ThemeProvider } from "theme-ui";
import { addDecorator } from "@storybook/react";

import { SanityClientProvider } from "../src/context/sanityClient";
import theme from "../src/theme";

const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
};

const ThemeWrapper = ({ children }) => (
  <SanityClientProvider {...sanityConfig}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </SanityClientProvider>
);

addDecorator(renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>);
