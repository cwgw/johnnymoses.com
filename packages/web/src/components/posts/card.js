import React from "react";
import { format } from "date-fns";

import PortableText from "../portableText";
import Box from "../box";
import Text from "../text";
import Heading from "../heading";

const Card = props => {
  const {
    _createdAt,
    _updatedAt,
    content: { main },
  } = props;
  const publishedAt = format(new Date(_updatedAt || _createdAt), "MMM. d, y");
  const { title, body } = main;
  return (
    <Box
      sx={{
        px: 4,
        py: 3,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grays.700",
        borderRadius: 4,
      }}
    >
      <Text as="p" color="grays.500" variant="small">
        {publishedAt}
      </Text>
      <Heading>{title}</Heading>
      <PortableText blocks={body} />
    </Box>
  );
};

export default Card;
