import React from 'react'

import { useCartTotals, useCartItems, useCheckout } from '../../context/shopifyClient'
import LineItem from './lineItem';

const Cart = () => {
  const { total } = useCartTotals()
  const lineItems = useCartItems()
  const openCheckout = useCheckout();
  
  return (
    <div>
      {lineItems.length > 0 ? (
        <div>
          {lineItems.map(item => (
            <LineItem {...item} />
          ))}
        </div>
      ) : (
        <div>Cart is empty</div>
      )}
    </div>
  )
}

export default Cart;
