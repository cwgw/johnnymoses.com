import React from "react";
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import GatsbyImage from "gatsby-image";
import { useThemeUI } from "theme-ui";

import { Box } from "../common";

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
};

const ImageModule = ({ image, width, caption, ...props }) => {
  const imageId = image.asset?.id;

  const fluid = getFluidGatsbyImage(
    imageId,
    { maxWidth: width || 1200 },
    sanityConfig
  );

  const { theme } = useThemeUI();

  const img = fluid ? (
    <GatsbyImage
      fluid={fluid}
      backgroundColor={theme.colors.grays[1]}
      style={{ position: "static", height: "100%" }}
    />
  ) : (
    <span>Couldn't retrieve image</span>
  );

  return (
    <Box
      as={caption ? "figure" : "div"}
      {...props}
      __css={{ position: "relative" }}
    >
      {img}
      {caption && <figcaption>{caption}</figcaption>}
    </Box>
  );
};

export { ImageModule };
