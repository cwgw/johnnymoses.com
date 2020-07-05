/** @jsx jsx */
import { jsx } from "theme-ui";

import Box from "../box";
import Grid from "../grid";
import Heading from "../heading";
import ProductCard from "../product/card";

const ProductGridModule = ({ title, products }) => {
  return (
    <Box variant="container" >
      {title && (
        <Heading px={4}>{title}</Heading>
      )}
      <Grid px={4} columns={[ 1, 2, 3 ]} >
        {products.map(product => (
          <ProductCard key={product._id} {...product} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGridModule;
