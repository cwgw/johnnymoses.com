import React from "react";

import PortableText from "../portableText";

const TextModule = ({ text, ...props }) => (
  <PortableText blocks={text} px={4} {...props} />
);

export default TextModule;
