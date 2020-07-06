import React from "react";
import { graphql } from "gatsby";

import Product from "../components/product/product";
import Box from "../components/box";

const PageTemplate = ({ data, previewData }) => {
  const content = previewData
    ? previewData.content
    : data.sanityProduct._rawContent;

  return (
    <Box variant="container">
      <Product content={content} />
    </Box>
  );
};

export default PageTemplate;

export const query = graphql`
  query sanityProduct($id: String!) {
    sanityProduct(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 9 })
    }
  }
`;