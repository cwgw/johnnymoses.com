/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import renderPageModules from "../utils/renderPageModules";

const PageTemplate = ({ data, previewData }) => {
  const { main, meta } = previewData
    ? previewData.content
    : data.sanityPage._rawContent;

  return (
    <React.Fragment>
      <SEO meta={meta} />
      {renderPageModules(main.modules)}
    </React.Fragment>
  );
};

export default PageTemplate;

export const query = graphql`
  query sanityPage($id: String!) {
    sanityPage(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 9 })
    }
  }
`;
