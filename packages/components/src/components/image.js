import React from "react";
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import { useThemeUI } from "theme-ui";
import GatsbyImage from "gatsby-image";

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
};

const Image = React.forwardRef(({ _type, asset, width, ...props }, ref) => {
  let fluid;

  if (_type === "image") {
    const imageId = asset.id || asset._ref;
    fluid = getFluidGatsbyImage(
      imageId,
      { maxWidth: width || 1200 },
      sanityConfig
    );
  }

  const { theme } = useThemeUI();

  return fluid ? (
    <GatsbyImage
      ref={ref}
      fluid={fluid}
      backgroundColor={theme.colors.grays[1]}
      {...props}
    />
  ) : (
    <strong>Couldn't retrieve image.</strong>
  );
});

export default Image;
