import React from 'react'

import useVariant from '../../hooks/useVariant'
import Button from '../button';
import Box from '../box';
import Price from './price';

const Form = ({ className, handle, withPrice, }) => {
  const {
    isAdding,
    isAvailable,
    variant,
    // handleOptionChange,
    handleAddItemToCart,
  } = useVariant({ handle })

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    handleAddItemToCart();
  }
  
  return (
    <Box
      as="form"
      className={className}
      onSubmit={handleSubmit}
    >
      {withPrice && (
        <Price
          compareAtPrice={variant.compareAtPriceV2}
          price={variant.priceV2}
        />
      )}
      <Button
        type="submit"
        disabled={!isAvailable || isAdding}
        >
        {isAvailable ? (
          <span>{isAdding ? 'Adding…' : 'Add to Cart'}</span>
        ) : (
          <span>Currently out of stock</span>
        )}
      </Button>
    </Box>
  )
}

export default Form;
