import React from "react";

import PortableText from "../portableText";
import Box from "../box";
import Heading from "../heading";

const Post = ({ title, body }) => {
  return (
    <Box as="article" maxWidth="half" mx="auto">
      <Heading as="h1">{title}</Heading>
      <PortableText blocks={body} />
    </Box>
  );
};

export default Post;
