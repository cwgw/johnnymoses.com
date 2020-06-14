/** @jsx jsx */
import { jsx } from "theme-ui";

import { Box, Heading } from "../common";
import ProductCard from "../productCard";

const ProductGridModule = props => {
  const { title, products } = props;

  return (
    <Box
      sx={{
        mx: "auto",
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

export { ProductGridModule };
