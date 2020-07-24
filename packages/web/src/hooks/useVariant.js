import React from "react";
import isEqualWith from "lodash/isEqualWith";
import get from "lodash/get";

import { client, useAddItemToCart } from "../context/shopifyClient";

const useVariant = ({ handle }) => {
  const addItemToCart = useAddItemToCart();
  const product = React.useRef({});
  const [quantity, setQuantity] = React.useState(1);
  const [variant, setVariant] = React.useState({});
  const [status, setStatus] = React.useState({ adding: false, added: false });

  const timeout = React.useRef();

  const { id: variantId, available: isAvailable } = variant;

  React.useEffect(() => {
    return () => {
      if (timeout.current && timeout.current.clearTimeout) {
        timeout.current.clearTimeout();
        timeout.current = null;
      }
    };
  }, []);

  React.useEffect(() => {
    fetchProduct(handle);
    async function fetchProduct(handle) {
      try {
        product.current = await client.product.fetchByHandle(handle);
        setVariant(product.current.variants[0]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [handle]);

  const handleOptionChange = React.useCallback(
    (name, value) => {
      const newOptions = variant.selectedOptions.map(o => {
        if (o.name === name) {
          return { ...o, value };
        }
        return o;
      });

      const selectedVariant = product.current.variants.find(
        ({ selectedOptions }) =>
          isEqualWith(newOptions, selectedOptions, (a, b) => {
            for (let i = 0; i < a.length; i++) {
              if (a[i].name !== b[i].name || a[i].value !== b[i].value) {
                return false;
              }
            }
            return true;
          })
      );

      if (selectedVariant) {
        setVariant(selectedVariant);
      } else {
        console.warn(
          `Couldn't find product variant with "${name}" == "${value}"`
        );
      }
    },
    [variant]
  );

  const handleQuantityChange = React.useCallback(
    input => {
      let value = get(input, "target.value", input);
      if (typeof value === "string") {
        value = parseInt(value, 10);
      }
      setQuantity(value);
    },
    [setQuantity]
  );

  const handleAddItemToCart = React.useCallback(() => {
    if (isAvailable) {
      return addItem();
    } else {
      return Promise.resolve();
    }

    async function addItem() {
      setStatus({ added: false, adding: true });
      await addItemToCart(variantId, quantity);
      setStatus({ added: true, adding: false });
      timeout.current = setTimeout(() => {
        setStatus({ added: false, adding: false });
      }, 1500);
    }
  }, [addItemToCart, setStatus, isAvailable, variantId, quantity]);

  return {
    status,
    isAvailable: variant.available || false,
    variant,
    product: product.current,
    quantity,
    handleOptionChange,
    handleQuantityChange,
    handleAddItemToCart,
  };
};

export default useVariant;
