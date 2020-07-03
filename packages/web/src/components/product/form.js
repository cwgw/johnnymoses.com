import React from 'react'

import { client, useAddItemToCart } from '../../context/shopifyClient';

const Form = (props) => {
  console.log('Form', { props });
  const { title, defaultPrice, productId } = props;
  const addItemToCart = useAddItemToCart();

  const [quantity, setQuantity] = React.useState(1);
  const [adding, setAdding] = React.useState(false);
  const [available, setAvailable] = React.useState(false);
  const [activeVariantId, setActiveVariantId] = React.useState('');
  const [compareAtPrice, setCompareAtPrice] = React.useState();
  const [check, setCheck] = React.useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    if (available) {
      addItemToCart(activeVariantId, quantity).then(() => {
        setAdding(false)
      })
    }
  }

  React.useEffect(
    () => {
      if (!props.handle) {
        console.log('props.handle == ', props.handle);
        return;
      }

      client.product.fetchByHandle(props.handle)
        .then(product => {
          console.log({ product });
        })
        .catch(error => {
          console.error(error)
        })
    },
    [props.handle]
  );

  // React.useEffect(() => {
  //   if (check) {
  //     const shopifyId = encode("Product", productId, {
  //       accessToken: process.env.GATSBY_SHOPIFY_TOKEN,
  //     })

  //     client.product.fetch(shopifyId).then((product) => {
  //       const decodedVariants = [];
  //       product.variants.forEach((variant) => {
  //         decodedVariants.push({
  //           ...variant,
  //           cleanId: parseInt(decode(variant.id).id, 0),
  //         })
  //       })
  //       setActiveVariantId(decodedVariants[0].id)
  //       setAvailable(decodedVariants[0].available)

  //       if (decodedVariants[0].compareAtPrice) setCompareAtPrice(decodedVariants[0].compareAtPrice)

  //       setCheck(false)
  //     })
  //   }
  // }, [check])
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {available && !check ? (
          <button type="submit">
            <span>{adding ? 'Adding' : 'Add to Cart'}</span>
          </button>
        ) : (
          <button disabled>
            <span>Currently out of stock</span>
          </button>
        )}
      </form>
    </div>
  )
}

export default Form;
