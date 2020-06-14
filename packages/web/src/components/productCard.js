/** @jsx jsx */
import { jsx } from "theme-ui";
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import GatsbyImage from "gatsby-image";
import { useThemeUI } from "theme-ui";

import { Box, Button, Flex, Heading } from "./common";
import BlockContent from "./modules/blockContent";

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
};

const Image = ({ image, width }) => {
  const imageId = image.asset?.id || image.asset?._ref;

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
      // style={{ position: "static", height: "100%" }}
    />
  ) : (
    <span>Couldn't retrieve image</span>
  );

  return img;
};

const ProductCard = props => {
  // console.log(props);
  const {
    content: { main, shopify },
  } = props;

  return (
    <Flex
      sx={{
        mb: 4,
        p: 3,
        border: "1px solid",
        borderColor: "grays.2",
        flexFlowflexWrap: "nowrap",
      }}
    >
      {main.mainImage && (
        <Box
          sx={{
            width: 200,
            flex: "0 0 auto",
            border: "1px solid",
            borderColor: "grays.1",
          }}
        >
          <Image image={main.mainImage} width={400} />
        </Box>
      )}
      <Flex
        sx={{
          flexFlow: "column nowrap",
          flexBasis: "100%",
          pl: 3,
        }}
      >
        <Heading as="h4">{main.title}</Heading>
        <BlockContent blocks={main.productDescription} />
        <Flex
          sx={{
            mt: "auto",
            alignItems: "baseline",
          }}
        >
          <p>
            <strong>{shopify.defaultPrice}</strong>
          </p>
          <Button disabled={true} ml="auto">
            Add to cart
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
