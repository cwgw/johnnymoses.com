/** @jsx jsx */
import { jsx } from "theme-ui";

import useVariant from "../../hooks/useVariant";

import BlockContent from "../page-blocks/blockContent";
import Box from "../box";
import Flex from "../flex";
import Heading from "../heading";
import Image from "../image";

import Form from "./form";
import Options from "./options";
import Price from "./price";
import LinkedData from './linkedData'

const ProductCard = ({ content }) => {
  const { main, shopify } = content;
  const { variant, product, handleOptionChange } = useVariant({
    handle: shopify.handle,
  });

  return (
    <Flex as="article" >
      <LinkedData {...content} />
      {main.mainImage && (
        <Box sx={{ flex: `0 0 400px` }}>
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
        {product.options && (
          <Options
            options={product.options}
            selectedOptions={variant.selectedOptions}
            onChange={handleOptionChange}
          />
        )}
        <Price
          price={variant.priceV2}
          compareAtPrice={variant.compareAtPriceV2}
        />
        <Form {...shopify} />
        <BlockContent blocks={main.productDescription} />
      </Flex>
    </Flex>
  );
};

export default ProductCard;
