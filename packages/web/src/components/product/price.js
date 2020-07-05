/** @jsx jsx */
import { jsx } from "@theme-ui/core";
import VisuallyHidden from "@reach/visually-hidden";

import formatPrice from "../../utils/formatPrice";
import Box from "../box";

const Price = ({ compareAtPrice, price, ...props }) => {
  const isOnSale = !!compareAtPrice;
  const regularPrice = isOnSale ? compareAtPrice : price;
  const salePrice = isOnSale ? price : null;
  return (
    <Box
      as="dl"
      sx={{
        display: "inline-flex",
        flexFlow: "row wrap",
        "& > div": {
          display: "inline-block",
        },
        "dt, dd": {
          m: 0,
          p: 0,
        },
        dd: {
          mr: 2,
        },
      }}
      {...props}
    >
      {isOnSale && (
        <div>
          <dt>
            <VisuallyHidden>Sale Price</VisuallyHidden>
          </dt>
          <dd>
            <span
              sx={{
                fontWeight: "bold",
                color: "primary",
              }}
            >
              {formatPrice(salePrice)}
            </span>
          </dd>
        </div>
      )}
      <div>
        <dt>
          <VisuallyHidden>Regular Price</VisuallyHidden>
        </dt>
        <dd>
          <span
            sx={{
              color: "grays.400",
              fontWeight: isOnSale ? "regular" : "bold",
              textDecoration: isOnSale ? "line-through" : null,
            }}
          >
            {formatPrice(regularPrice)}
          </span>
        </dd>
      </div>
    </Box>
  );
};

export default Price;
