import React from "react";
import { format } from "date-fns";

import BlockContent from "../page-blocks/blockContent";
import Box from "../box";
import Text from "../text";
import Heading from "../heading";

const Card = props => {
  const {
    _createdAt,
    _updatedAt,
    content: { main, meta },
  } = props;
  const publishedAt = format(new Date(_updatedAt || _createdAt), "MMM. d, y");
  const { title, body } = main;
  return (
    <Box px={4}>
      <Text as="p" color="grays.500" variant="small">
        {publishedAt}
      </Text>
      <Heading>{title}</Heading>
      <BlockContent blocks={body} />
    </Box>
  );
};

export default Card;
