import React from "react";

import BlockContent from "./blockContent";

const TextModule = ({ text, ...props }) => (
  <BlockContent blocks={text} px={4} {...props} />
);

export default TextModule;
