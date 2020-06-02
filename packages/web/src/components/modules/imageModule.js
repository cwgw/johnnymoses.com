import React from "react";
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import GatsbyImage from "gatsby-image";
import { useThemeUI } from "theme-ui";

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
};

const Image = ({ image, width, caption }) => {
  const imageId = image.asset?.id;

  const fluid = getFluidGatsbyImage(
    imageId,
    { maxWidth: width || 1200 },
    sanityConfig
  );

  const { theme } = useThemeUI();

  const img = fluid ? (
    <GatsbyImage fluid={fluid} backgroundColor={theme.colors.grays[1]} />
  ) : (
    <span>Couldn't retrieve image</span>
  );

  if (caption) {
    return (
      <figure>
        {img}
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }

  return img;
};

export default Image;
