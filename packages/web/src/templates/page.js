/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { graphql } from 'gatsby'

import renderPageModules from "../utils/renderPageModules";

const PageTemplate = ({
  // pageContext: {
  //   main: { modules },
  // },
  data
}) => {
  const { sanityPage: { _rawContent: { main } } } = data;

  // console.log({data})
  
  return (
    <React.Fragment>{renderPageModules(main.modules)}</React.Fragment>
  );
};

export default PageTemplate;

export const query = graphql`
  query SanityPage($id: String!) {
    sanityPage(id: {eq: $id}) {
      _rawContent(resolveReferences: { maxDepth: 9 })
    }
  }
`