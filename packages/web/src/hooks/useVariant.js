import React from 'react';
import isEqualWith from 'lodash/isEqualWith';
import get from 'lodash/get';

import { client, useAddItemToCart } from '../context/shopifyClient'

const useVariant = ({ handle }) => {
  const addItemToCart = useAddItemToCart();
  const product = React.useRef({});
  const [quantity, setQuantity] = React.useState(1);
  const [variant, setVariant] = React.useState({});
  const [isAdding, setStatus] = React.useState(false);

  const { id: variantId, available: isAvailable } = variant;

  React.useEffect(
    () => {
      fetchProduct(handle);
      async function fetchProduct(handle) {
        try {
          product.current = await client.product.fetchByHandle(handle)
          setVariant(product.current.variants[0]);
        } catch (error) {
          console.error(error);
        }  
      }
    },
    [handle]
  );

  const handleOptionChange = React.useCallback(
    (name, value) => {
      const newOptions = variant.selectedOptions.map(o => {
        if (o.name === name) {
          return { ...o, value };
        }
        return o;
      });

      const selectedVariant = product.current.variants.find(
        ({ selectedOptions }) => isEqualWith(newOptions, selectedOptions, (a, b) => {
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
  )

  const handleQuantityChange = React.useCallback(
    (input) => {
      let value = get(input, 'target.value', input);
      if (typeof value === 'string') {
        value = parseInt(value, 10);
      }
      setQuantity(value);
    },
    [setQuantity]
  );

  const handleAddItemToCart = React.useCallback(
    () => {
      if (isAvailable) {
        addItem();
      }

      async function addItem() {
        setStatus(true);
        console.log({variantId, quantity })
        await addItemToCart(variantId, quantity);
        setStatus(false);
      }
    },
    [addItemToCart, setStatus, isAvailable, variantId, quantity]
  );

  return {
    isAdding,
    isAvailable: variant.available || false,
    variant,
    product: product.current,
    handleOptionChange,
    handleQuantityChange,
    handleAddItemToCart,
  }
};

export default useVariant;
