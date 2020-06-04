import React from "react";

import { Box } from "./box";

const baseStyles = {
  width: "100%",
  display: "flex",
};

const Label = React.forwardRef((props, ref) => (
  <Box ref={ref} as="label" __css={baseStyles} __themeKey="forms" {...props} />
));

export { Label };
