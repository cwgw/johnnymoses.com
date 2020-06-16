/** @jsx jsx */
import { jsx } from "theme-ui";

import Box from "../box";
import Heading from "../heading";
import ProductCard from "../productCard";

const ProductGridModule = props => {
  const { title, products } = props;
  console.log(products);

  return (
    <Box
      sx={{
        mx: "auto",
        px: 4,
        width: "full",
      }}
    >
      {title && <Heading>{title}</Heading>}
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Box>
  );
};

export default ProductGridModule;
