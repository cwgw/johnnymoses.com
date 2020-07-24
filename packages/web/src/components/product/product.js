/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import BlockContent from "../page-blocks/blockContent";
import Box from "../box";
import Flex from "../flex";
import Heading from "../heading";
import Image from "../image";
import Text from "../text";

import Form from "./form";
import LinkedData from "./linkedData";

const Product = ({ content }) => {
  const { main, shopify } = content;

  return (
    <Flex
      as="article"
      sx={{
        alignItems: "start",
        flexWrap: "wrap",
        maxWidth: "100%",
        "& > *": {
          position: ["relative", null, "sticky"],
          top: 3,
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: [null, null, "half"],
          maxWidth: "100%",
          width: "100%",
        },
      }}
    >
      <LinkedData {...content} />
      {main.mainImage && (
        <Box px={[4, null, 0]}>
          <Image width={400} sx={{ boxShadow: 4 }} {...main.mainImage} />
        </Box>
      )}
      <Form handle={shopify.handle} p={4} pl={[null, null, 5]}>
        {({ price, quantity, options, submit }) => (
          <React.Fragment>
            <header>
              <Text as="span" variant="eyebrow">
                {main.productType}
              </Text>
              <Heading as="h1">{main.title}</Heading>
            </header>
            <Box mb={3}>{price}</Box>
            {main.productDescription && (
              <BlockContent mb={3} blocks={main.productDescription} />
            )}
            <Box mb={3}>{options}</Box>
            <Box mb={3}>{quantity}</Box>
            {submit}
          </React.Fragment>
        )}
      </Form>
    </Flex>
  );
};

export default Product;
