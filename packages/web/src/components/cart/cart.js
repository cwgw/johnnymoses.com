/** @jsx jsx */
import { jsx } from 'theme-ui'

import Heading from '../heading';
import Flex from '../flex';
import LineItemList from './lineItems'
import Summary from './summary';

const Cart = () => {  
  return (
    <Flex
      sx={{
        variant: "container",
        flexWrap: 'wrap',
      }}
    >
      <Heading
        sx={{
          width: '100%',
          px: 4,
        }}
      >
        Your Cart
      </Heading>
      <LineItemList
        sx={{
          mb: 4,
          flexBasis: 640,
          flexGrow: 1,
        }}
      />
      <Summary
        sx={{
          ml: 'auto',
          mb: 4,
          alignSelf: 'start',
          flexBasis: 380,
          flexGrow: 1,
        }}
      />
    </Flex>
  )
}

export default Cart;
