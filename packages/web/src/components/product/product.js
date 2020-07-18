/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import useVariant from "../../hooks/useVariant";
import formatPrice from "../../utils/formatPrice";

import BlockContent from "../page-blocks/blockContent";
import Box from "../box";
import Flex from "../flex";
import Heading from "../heading";
import Image from "../image";
import FormField from "../formField";

import Options from "./options";
import Price from "./price";
import Button from "../button";
import LinkedData from "./linkedData";

const Product = ({ content }) => {
  const { main, shopify } = content;
  const {
    variant,
    product,
    isAdding,
    isAvailable,
    quantity,
    handleOptionChange,
    handleAddItemToCart,
    handleQuantityChange,
  } = useVariant({
    handle: shopify.handle,
  });

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      handleAddItemToCart();
    },
    [handleAddItemToCart]
  );

  console.log({ variant });

  return (
    <Flex as="article">
      <LinkedData {...content} />
      {main.mainImage && (
        <Box sx={{ flex: `0 0`, flexBasis: "half" }}>
          <Image width={400} {...main.mainImage} />
        </Box>
      )}
      <Flex
        sx={{
          flexFlow: "column nowrap",
          flexBasis: "half",
          p: 4,
          pl: 5,
        }}
      >
        <span sx={{ variant: "text.eyebrow" }}>{main.productType}</span>
        <form onSubmit={handleSubmit}>
          <Heading as="h1">{main.title}</Heading>
          <Box sx={{ mb: 4 }}>
            <Price
              price={variant.priceV2}
              compareAtPrice={variant.compareAtPriceV2}
              showCurrency
            />
          </Box>
          <BlockContent blocks={main.productDescription} />
          {product.options && (
            <Options
              options={product.options}
              selectedOptions={variant.selectedOptions}
              onChange={handleOptionChange}
              mb={3}
            />
          )}
          <FormField
            type="counter"
            label="Quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            mx={3}
          />
          <Button
            type="submit"
            disabled={!isAvailable || isAdding}
            variant="submit"
          >
            {isAvailable ? (
              isAdding ? (
                <span>Adding…</span>
              ) : (
                <span>
                  {"Add to cart - "}
                  {formatPrice(variant.priceV2, quantity)}
                </span>
              )
            ) : (
              <span>Currently out of stock</span>
            )}
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Product;
