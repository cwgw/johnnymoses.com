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
      <Box variant="container" mb={[0, 4]}>
        <LineItemList />
      </Box>
      <Box sx={{ backgroundColor: "grays.900", mx: [0, 0, 4], py: 4 }}>
        <Box variant="container">
          <Summary sx={{ maxWidth: [null, "half"], ml: "auto" }} title={null} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Cart;
