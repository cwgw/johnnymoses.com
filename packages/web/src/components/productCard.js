/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import formatPrice from "../utils/formatPrice";

import Box from "./box";
import Button from "./button";
import Flex from "./flex";
import Heading from "./heading";
import Image from "./image";

import BlockContent from "./modules/blockContent";

const ProductCard = props => {
  console.log(props);
  const {
    content: { main, shopify },
    _type,
  } = props;

  const isThirdParty = _type === "productThirdParty";

  return (
    <Flex
      sx={{
        mb: 4,
        p: 3,
        border: "1px solid",
        borderColor: "grays.700",
        flexFlowflexWrap: "nowrap",
      }}
    >
      {main.mainImage && (
        <Box
          sx={{
            width: 200,
            flex: "0 0 auto",
            border: "1px solid",
            borderColor: "grays.800",
          }}
        >
          <Image width={400} {...main.mainImage} />
        </Box>
      )}
      <Flex
        sx={{
          flexFlow: "column nowrap",
          flexBasis: "100%",
          pl: 3,
        }}
      >
        <span sx={{ variant: "text.eyebrow" }}>{main.productType}</span>
        <Heading as="h4">{main.title}</Heading>
        <BlockContent blocks={main.productDescription} />
        <Flex
          sx={{
            mt: "auto",
            alignItems: "baseline",
          }}
        >
          {isThirdParty ? (
            <Button to={main.url} variant="secondary" ml="auto">
              Buy from <strong>{main.vendorName}</strong>
            </Button>
          ) : (
            <React.Fragment>
              <p>
                <strong>{formatPrice({ amount: shopify.defaultPrice })}</strong>
              </p>
              <Button disabled={true} ml="auto">
                Add to cart
              </Button>
            </React.Fragment>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
