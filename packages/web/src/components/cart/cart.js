/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";

import Heading from "../heading";
import Box from "../box";
import LineItemList from "./lineItems";
import Summary from "./summary";

const Cart = () => {
  return (
    <React.Fragment>
      <Heading
        sx={{
          variant: "container",
          px: 4,
        }}
      >
        Your Cart
      </Heading>
      <Box variant="container">
        <LineItemList sx={{ mb: 4 }} />
      </Box>
      <Box sx={{ backgroundColor: "grays.900" }}>
        <Box variant="container">
          <Summary sx={{ maxWidth: "half", ml: "auto" }} title={null} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Cart;
