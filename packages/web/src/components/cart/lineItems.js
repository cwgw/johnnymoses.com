/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useTransition, animated } from "react-spring";

import {
  client,
  useCartItems,
  useCheckoutStatus,
  useUpdateItemsFromCart,
  useRemoveItemFromCart,
} from "../../context/shopifyClient";

import { isDefaultOption } from "../../utils/isNotDefaultOption";
import useProductURL from "../../hooks/useProductURL";

import Button from "../button";
import Counter from "../counter";
import Link from "../link";
import Text from "../text";
import Flex from "../flex";
import Box from "../box";
import Price from "../product/price";
import Grid from "../grid";

const LineItem = React.forwardRef(({ item, ...props }, ref) => {
  const { variant, id, title, quantity } = item;
  const updateItemsFromCart = useUpdateItemsFromCart();
  const removeItemFromCart = useRemoveItemFromCart();
  const [image, setImage] = React.useState();

  React.useEffect(() => {
    getImage();

    async function getImage() {
      try {
        const src = await client.image.helpers.imageForSize(variant.image, {
          maxWidth: 200,
          maxHeight: 400,
        });
        setImage(src);
      } catch (error) {
        console.warn(error);
      }
    }
  }, [variant]);

  const url = useProductURL(variant.product.handle);

  const selectedOptions = variant.selectedOptions.map(option =>
    isDefaultOption(option) ? null : (
      <div
        key={option.name}
        sx={{
          fontSize: 1,
          color: "grays.500",
          "dt, dd": {
            display: "inline",
          },
          "dt::after": {
            content: "': '",
            display: "inherit",
          },
          dd: {
            m: 0,
          },
        }}
      >
        <dt>{option.name}</dt>
        <dd>{option.value}</dd>
      </div>
    )
  );

  return (
    <Grid
      px={[0, 4]}
      mx={[4, 0]}
      py={4}
      borderTop="1px solid"
      borderColor="grays.800"
      sx={{
        gridTemplateColumns: ["1fr 1fr 1fr", "1fr 6em 6em"],
        gridTemplateRows: "min-content 1fr",
        backgroundColor: "background",
        gridRowGap: [4, 1],
        gridColumnGap: [3, 4],
      }}
      ref={ref}
      {...props}
    >
      {/* meta */}
      <Flex
        alignItems="start"
        sx={{
          gridColumn: ["1/-1", 1],
          gridRow: [null, "1 / span 2"],
        }}
      >
        <Box
          sx={{
            position: "relative",
            alignSelf: "center",
            flexShrink: 0,
            mr: 3,
            width: [75, 100],
          }}
        >
          {image ? (
            <img
              sx={{
                display: "block",
                width: "100%",
              }}
              src={image}
              alt={variant.image.altText}
            />
          ) : (
            <div
              sx={{
                width: "100%",
                height: 0,
                pb: "100%",
                backgroundColor: "grays.900",
              }}
            />
          )}
          <Link to={url} tabIndex="-1" variant="utils.span">
            <span sx={{ variant: "utils.visuallyHidden" }}>{title}</span>
          </Link>
        </Box>

        <Text>
          <Link to={url} variant="plain">
            {title}
          </Link>
          {selectedOptions && <dl>{selectedOptions}</dl>}
        </Text>
      </Flex>

      <Box
        sx={{
          gridColumn: [null, 2],
          gridRow: [null, "1 / span 2"],
          justifySelf: ["start", "center"],
        }}
      >
        <Counter
          type="counter"
          value={quantity}
          onChange={value => {
            updateItemsFromCart([{ id, quantity: value }]);
          }}
        />
      </Box>

      <Box
        sx={{
          gridColumn: [null, 3],
          gridRow: [null, 2],
          justifySelf: ["center", "end"],
        }}
      >
        <Button
          variant="plain"
          mt="auto"
          color={[null, "textMuted"]}
          fontSize={[null, 1]}
          onClick={() => removeItemFromCart(id)}
        >
          Remove
        </Button>
      </Box>

      {/* line price */}
      <Box
        sx={{
          // textAlign: "right",
          justifySelf: "end",
          fontWeight: "bold",
          gridRow: [null, 1],
          // gridColumn: [2, 4],
        }}
      >
        <Price
          price={variant.priceV2}
          compareAtPrice={variant.compareAtPriceV2}
        />
      </Box>
    </Grid>
  );
});

const LineItems = props => {
  const items = useCartItems();
  const { isInitialized } = useCheckoutStatus();

  const [refs] = React.useState(() => new WeakMap([]));

  const transitions = useTransition(items, {
    keys: item => item.id,
    from: isInitialized ? null : { opacity: 0, height: 0 },
    enter: item => async next => {
      await next({
        opacity: 1,
        height: refs.has(item) ? refs.get(item).offsetHeight : null,
      });
      await next({ height: "auto", config: { immediate: true } });
    },
    leave: item => async next => {
      await next({
        height: refs.has(item) ? refs.get(item).offsetHeight : null,
        config: { immediate: true },
      });
      await next({ height: 0, opacity: 0 });
    },
    config: {
      tension: 300,
      friction: 30,
    },
  });

  if (!isInitialized) {
    return (
      <Flex alignItems="center" justifyContent="center" p={4} {...props}>
        {"Loading…"}
      </Flex>
    );
  }

  if (items.length < 1) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100%"
        p={4}
        {...props}
      >
        {"Your cart is empty!"}
      </Flex>
    );
  }

  return (
    <Box {...props}>
      <Grid
        columns="6em 6em"
        mb={3}
        px={4}
        sx={{
          justifyContent: "end",
          gridColumnGap: [3, 4],
          display: ["none", "grid"],
        }}
      >
        <Text textAlign="center">Quantity</Text>
        <Text textAlign="right">Price</Text>
      </Grid>
      <Box as="ul">
        {transitions((style, item) => (
          <animated.li
            style={{
              ...style,
              overflow: "hidden",
            }}
          >
            <LineItem ref={ref => refs.set(item, ref)} item={item} />
          </animated.li>
        ))}
      </Box>
    </Box>
  );
};

export default LineItems;
