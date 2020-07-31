import React from "react";

import {
  useCartTotals,
  useCartCount,
  useCheckout,
  useCheckoutStatus,
} from "../../context/shopifyClient";

import Button from "../button";
import Heading from "../heading";
import Flex from "../flex";
import Text from "../text";
import Grid from "../grid";

const defaultProps = {
  title: "Order Summary",
};

const OrderSummary = ({ title, ...props }) => {
  const checkout = useCheckout();
  const count = useCartCount();
  const { isInitialized } = useCheckoutStatus();
  const { subtotal } = useCartTotals();

  if (isInitialized && count < 1) {
    return (
      <Grid columns={1} py={3} px={4} {...props}>
        <Text variant="display2" textAlign="center">
          Your cart is empty.
        </Text>
        <Button variant="secondary" to="/">
          Continue Shopping →
        </Button>
      </Grid>
    );
  }

  return (
    <Grid columns={1} py={3} px={4} {...props}>
      {title && <Heading>{title}</Heading>}
      <Flex justifyContent="space-between" fontWeight="bold">
        <span>{`Subtotal (${count} item${count === 1 ? "" : "s"}):`}</span>
        <span>{subtotal || "---"}</span>
      </Flex>
      <Text as="small" textAlign="center">
        Taxes and shipping cost will be finalized at checkout.
      </Text>
      <Button onClick={checkout} disabled={count < 1}>
        Checkout
      </Button>
      <Button variant="secondary" to="/">
        Continue Shopping →
      </Button>
    </Grid>
  );
};

OrderSummary.defaultProps = defaultProps;

export default OrderSummary;
