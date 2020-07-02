import React from "react";
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import { useThemeUI } from "theme-ui";
import GatsbyImage from "gatsby-image";

import { useSanityClient } from '../context/sanityConfig'

const Image = React.forwardRef(({ _type, asset, width, ...props }, ref) => {
  let fluid;

  const { config } = useSanityClient();

  if (asset) {
    const imageId = asset.id || asset._ref;
    fluid = getFluidGatsbyImage(
      imageId,
      { maxWidth: width || 1200 },
      config
    );
  }

  const { theme } = useThemeUI();

  return fluid ? (
    <GatsbyImage
      ref={ref}
      fluid={fluid}
      backgroundColor={theme.colors.grays['900']}
      {...props}
    />
  ) : (
    <strong>Couldn't retrieve image.</strong>
  );
});

export default Image;
