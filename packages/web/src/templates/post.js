/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Post from "../components/posts/post";

const PostTemplate = ({ data, previewData }) => {
  const { main, meta } = previewData
    ? previewData.content
    : data.sanityPost._rawContent;

  return (
    <React.Fragment>
      <SEO {...meta} />
      <Post {...main} />
    </React.Fragment>
  );
};

export default PostTemplate;

export const query = graphql`
  query sanityPost($id: String!) {
    sanityPost(id: { eq: $id }) {
      _rawContent(resolveReferences: { maxDepth: 9 })
    }
  }
`;
