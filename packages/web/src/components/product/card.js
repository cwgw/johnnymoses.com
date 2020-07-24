/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import useProductURL from "../../hooks/useProductURL";
import Box from "../box";
import Button from "../button";
import Flex from "../flex";
import Heading from "../heading";
import Image from "../image";
import Link from "../link";
import LinkedData from "./linkedData";
import formatPrice from "../../utils/formatPrice";

const ProductCard = ({ content, _type }) => {
  const { main, shopify } = content;

  const isThirdParty = _type === "productThirdParty";

  const slug = useProductURL(main.slug && main.slug.current);
  const url = isThirdParty ? main.url : slug;

  return (
    <Flex
      as="article"
      flexDirection="column"
      position="relative"
      // textAlign="center"
    >
      {shopify && <LinkedData {...content} />}
      {main.mainImage && (
        <Box position="relative">
          <Image width={400} sx={{ boxShadow: 4 }} {...main.mainImage} />
          <Link to={url} variant="utils.span" tabIndex={-1} />
        </Box>
      )}
      <Flex p={3} justifyContent="space-between">
        {isThirdParty ? (
          <Button to={main.url} mt="auto">
            Buy from <strong>{main.vendorName}</strong>
          </Button>
        ) : (
          <React.Fragment>
            <Heading as="h3" variant="plain">
              <Link to={url} variant="fill">
                {main.title}
              </Link>
            </Heading>
            <Box ml={3} sx={{ flexShrink: 0 }}>
              {formatPrice({ amount: shopify.defaultPrice })}
            </Box>
          </React.Fragment>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductCard;
