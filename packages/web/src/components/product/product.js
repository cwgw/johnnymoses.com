/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import useProductForm from "../../hooks/useProductForm";

import BlockContent from "../page-blocks/blockContent";
import Box from "../box";
import Heading from "../heading";
import Image from "../image";
import Text from "../text";
import Grid from "../grid";

import Form from "./form";
import LinkedData from "./linkedData";
import * as metaFields from "./metaFields";

const Product = ({ content }) => {
  const { main, shopify } = content;
  const form = useProductForm(shopify);
  // console.log({ shopify })
  // console.log({ variantContent: form.variantContent })
  const productMetaFields = form.variantContent?.main?.productMetaFields || [];

  return (
    <Box as="article" variant="container" px={4} my={5}>
      <Grid
        columns={[1, null, 2]}
        sx={{
          maxWidth: "100%",
          alignItems: "start",
          "& > *": {
            position: ["relative", null, "sticky"],
            top: 3,
            maxWidth: "100%",
            width: "100%",
          },
        }}
      >
        <LinkedData {...content} />
        <Box>
          {main.mainImage && (
            <Box mb={5} border="1px solid" borderColor="grays.900">
              <Image width={400} {...main.mainImage} />
            </Box>
          )}
          {productMetaFields && renderProductMetaFields(productMetaFields)}
        </Box>
        <Form
          form={form}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifySelf: "center",
            width: "third",
            maxWidth: "third",
          }}
        >
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
      </Grid>
    </Box>
  );
};

function renderProductMetaFields(fields) {
  return fields.map(({ _key, _type, ...field }, i) => {
    const Component = metaFields[_type];
    if (Component) {
      return <Component key={_key} {...field} mb={5} open={!i} />;
    }

    return null;
  });
}

export default Product;
