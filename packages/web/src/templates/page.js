/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { graphql } from "gatsby";

import renderPageModules from "../utils/renderPageModules";

const PageTemplate = ({ data, previewData }) => {
  let modules = [];
  if (previewData) {
    modules = previewData.content.main.modules;
  } else {
    modules = data.sanityPage._rawContent.main.modules;
  }

  return <React.Fragment>{renderPageModules(modules)}</React.Fragment>;
};

export default PageTemplate;

export const query = graphql`
  query SanityPage($id: String!) {
    sanityPage(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 9 })
    }
  }
`;
