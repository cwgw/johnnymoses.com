/** @jsx jsx */
import { jsx } from "@theme-ui/core";

import {
  useCheckout,
  useCartTotals,
  useCartCount,
} from "../../context/shopifyClient";
import Button from "../button";
import Heading from "../heading";
import Box from "../box";

const OrderSummary = props => {
  const checkout = useCheckout();
  const cartCount = useCartCount();
  const isEmpty = cartCount < 1;
  const { subtotal, total, tax } = useCartTotals();
  const rows = [
    ["Subtotal", subtotal],
    ["Taxes", tax],
    ["Estimated total", total],
  ];

  return (
    <Box
      sx={{
        backgroundColor: "grays.900",
        borderRadius: 3,
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
        textAlign: "center",
        py: 3,
        px: 4,
      }}
      {...props}
    >
      <Heading
        sx={{
          py: 3,
          px: 4,
          m: 0,
        }}
      >
        Order Summary
      </Heading>
      {rows.map(([name, value]) => (
        <div
          key={name + value}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 3,
            border: 0,
            "&:nth-last-of-type(n + 2)": {
              borderBottom: 1,
              borderStyle: "solid",
              borderColor: "lightGray",
            },
            "&:last-of-type": {
              fontSize: 3,
              fontWeight: "bold",
            },
          }}
        >
          <span>{name}</span>
          <span>{value}</span>
        </div>
      ))}
      <p>
        <small>Taxes and shipping cost will be finalized at checkout.</small>
      </p>
      <Button
        onClick={checkout}
        mb={3}
        disabled={isEmpty}
        title={isEmpty ? "Your cart is empty" : "Checkout"}
      >
        Checkout
      </Button>
      <Button variant="secondary" to="/" mb={3}>
        Continue Shopping →
      </Button>
    </Box>
  );
};

export default OrderSummary;
