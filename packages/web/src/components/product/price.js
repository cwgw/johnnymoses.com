/** @jsx jsx */
import React from "react";
import { jsx } from "@theme-ui/core";

import formatPrice from "../../utils/formatPrice";

import Box from "../box";

const Price = ({ compareAtPrice, price, showCurrency, quantity, ...props }) => {
  const isOnSale = !!compareAtPrice;

  return (
    <Box
      as="dl"
      sx={{
        display: "inline-flex",
        flexFlow: "row wrap",
        mx: -1,
        div: {
          display: "inline-block",
          mx: 1,
        },
        "dt, dd": {
          m: 0,
          p: 0,
        },
      }}
      {...props}
    >
      {isOnSale ? (
        <React.Fragement>
          <div>
            <dt sx={{ variant: "utils.visuallyHidden" }}>Price</dt>
            <dd sx={{ variant: "products.salePrice" }}>
              {formatPrice(price, quantity)}
              {showCurrency && ` ${price?.currencyCode}`}
            </dd>
          </div>
          <div>
            <dt sx={{ variant: "utils.visuallyHidden" }}>List Price</dt>
            <dd sx={{ variant: "products.compareAtPrice" }}>
              {formatPrice(compareAtPrice, quantity)}
              {showCurrency && ` ${compareAtPrice?.currencyCode}`}
            </dd>
          </div>
        </React.Fragement>
      ) : (
        <div>
          <dt sx={{ variant: "utils.visuallyHidden" }}>Price</dt>
          <dd sx={{ variant: "products.price" }}>
            {formatPrice(price, quantity)}
            {showCurrency && ` ${price?.currencyCode}`}
          </dd>
        </div>
      )}
    </Box>
  );
};

export default Price;
