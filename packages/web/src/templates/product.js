import React from "react";
import { graphql } from "gatsby";

import Product from "../components/products/product";
import SEO from "../components/seo";

const PageTemplate = ({ data, previewData }) => {
  const content = previewData
    ? previewData.content
    : data.sanityProduct._rawContent;

  return (
    <React.Fragment>
      <SEO {...content.meta} />
      <Product content={content} />
    </React.Fragment>
  );
};

export default PageTemplate;

export const query = graphql`
  query sanityProduct($id: String!) {
    sanityProduct(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 12 })
    }
  }
`;
