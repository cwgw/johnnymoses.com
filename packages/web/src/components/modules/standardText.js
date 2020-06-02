import React from "react";

import { Box } from "../common";
import BlockContent from "./blockContent";

const StandardText = ({ text, ...props }) => (
  <Box width="full" mx="auto" px={4}>
    <BlockContent width="half" blocks={text} {...props} />
  </Box>
);

export default StandardText;
