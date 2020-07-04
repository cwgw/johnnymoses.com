/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import formatPrice from "../../utils/formatPrice";

import Box from "../box";
import Button from "../button";
import Flex from "../flex";
import Heading from "../heading";
import Image from "../image";
import Listbox from '../listbox';

import useVariant from '../../hooks/useVariant'
import isNotDefaultOption from '../../utils/isNotDefaultOption'

import BlockContent from "../page-blocks/blockContent";

import Form from './form';
import Price from './price'

const ProductCard = props => {
  // console.log(props);
  const {
    content: { main, shopify },
    _type,
  } = props;

  const {
    variant,
    product,
    handleOptionChange,
  } = useVariant({ handle: shopify.handle });

  // console.log({ product, variant })

  // if (product.options) {
  //   product.options.forEach(option => {
  //     console.log(option);
  //   })
  // }

  const isThirdParty = _type === "productThirdParty";

  return (
    <Flex>
      {main.mainImage && (
        <Box
          sx={{
            width: 400,
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
        {product.options && product.options.map((option, i) => {
          return (
            <Listbox
              key={option.id}
              label={option.name}
              options={option.values.map(({value}) => value)}
              // onChange={e => handleOptionChange(option.name, variant.selectedOptions[i].value)}
              onChange={value => handleOptionChange(option.name, value) }
              // disabled={isOptionDisabled(option)}
              value={variant.selectedOptions[i].value}
            />
          )
        })}
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
              <Price price={variant.priceV2} compareAtPrice={variant.compareAtPriceV2} />
              <Form sx={{ ml: "auto" }} {...shopify} />
            </React.Fragment>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
