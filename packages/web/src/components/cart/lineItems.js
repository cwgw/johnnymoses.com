/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'

import { client, useCartItems, useCheckoutStatus, useUpdateItemsFromCart, useRemoveItemFromCart } from '../../context/shopifyClient'
import isNotDefaultOption from '../../utils/isNotDefaultOption'
import formatPrice from '../../utils/formatPrice'
import Button from '../button';
import Quantity from '../quantity';
import Link from '../link';
import Text from '../text';
import Flex from '../flex';
import Box from '../box';

const LineItem = ({ item }) => {
  const { variant, id, title, quantity } = item;
  const updateItemsFromCart = useUpdateItemsFromCart();
  const removeItemFromCart = useRemoveItemFromCart();
  const [image, setImage] = React.useState();

  React.useEffect(
    () => {
      getImage();

      async function getImage() {
        try {
          const src = await client.image.helpers.imageForSize(variant.image, { maxWidth: 200, maxHeight: 400 });
          setImage(src);
        } catch (error) {
          console.warn(error);
        }
      }
    },
    [variant]
  );

  return (
    <Flex
      as="li"
      sx={{
        flexFlow: 'row nowrap',
        px: 4,
        py: 3,
        '& + &': {
          borderTop: '1px solid',
          borderColor: 'grays.800',
        }
      }}
    >
      {/* image */}
      <Box
        sx={{
          position: 'relative',
          maxWidth: '100px',
          alignSelf: 'center',
        }}
      >
        {image ? (
          <img
            sx={{
              display: 'block',
              maxWidth: '100%',
            }}
            src={image}
            alt={variant.image.altText}
          />
        ) : (
          <div
            sx={{
              width: '100px',
              maxWidth: '100%',
              height: '100px',
              backgroundColor: 'grays.800'
            }}
          />
        )}
        <Link to={`/store/${variant.product.handle}`} variant="utils.span" >
          <VisuallyHidden>{title}</VisuallyHidden>
        </Link>
      </Box>

      {/* meta */}
      <Flex
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'start',
          flexBasis: '100%',
          px: 3,
        }}
      >
        <Text as="p" >{title}</Text>
        {isNotDefaultOption(variant.selectedOptions[0]) && (
          <dl>
            {variant.selectedOptions.map(({ name, value }) => (
              <div
                key={name + value}
                sx={{
                  color: 'grays.500',
                  'dt, dd': {
                    display: 'inline'
                  },
                  'dt::after': {
                    content: "': '",
                    display: 'inherit',
                  },
                  'dd': {
                    m: 0,
                  },
                }}
              >
                <dt>{name}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Quantity
            type="quantity"
            value={quantity}
            onChange={(value) => {
              updateItemsFromCart([{id, quantity: value}]);
            }}
          />
          <hr
            sx={{
              display: 'inline-block',
              width: 1,
              height: '1em',
              my: 0,
              mx: 3,
              backgroundColor: 'grays.700',
              verticalAlign: 'middle',
              border: 0,
            }}
          />
          <Button
            variant="link"
            onClick={() => removeItemFromCart(id)}
          >
            Remove
          </Button>
        </Box>
      </Flex>

      {/* price */}
      <Box
        sx={{
          flexBasis: "5em",
          flexGrow: 0,
          flexShrink: 0,
          textAlign: 'right',
          fontWeight: 'bold',
        }}
      >
        {formatPrice(variant.priceV2)}
      </Box>
    </Flex>
  );
}

const LineItemList = props => {
  const items = useCartItems();
  const { isInitialized } = useCheckoutStatus();

  if (isInitialized && items.length < 1) {
    console.log(`isInitialized && items.length < 1`)
  }

  if (items.length < 1) {
    return (
      <Flex
        sx={{
          p: 4,
          border: '1px solid',
          borderColor: 'grays.700',
          borderRadius: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...props}
      >
        {isInitialized
          ? "Your cart is empty!"
          : "Loading…"
        }
      </Flex>
    )
  }

  return (
    <Box
      as="ul"
      sx={{
        p: 0,
        m: 0,
        listStyle: 'none',
      }}
      {...props}
    >
      {items.map(item => (
        <LineItem key={item.id} item={item} />
      ))}
    </Box>
  );
}

export default LineItemList;
