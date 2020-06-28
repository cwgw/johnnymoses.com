import React from "react";

import Box from "./box";

const baseStyles = {
  display: "flex",
};

const Flex = React.forwardRef((props, ref) => (
  <Box ref={ref} __css={baseStyles} {...props} />
));

export default Flex;
