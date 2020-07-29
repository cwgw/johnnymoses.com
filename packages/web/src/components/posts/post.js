import React from "react";

import BlockContent from "../page-blocks/blockContent";
import Box from "../box";
import Heading from "../heading";

const Post = ({ title, body }) => {
  return (
    <Box as="article" maxWidth="half" mx="auto">
      <Heading as="h1">{title}</Heading>
      <BlockContent blocks={body} />
    </Box>
  );
};

export default Post;
