import React from "react";

import Box from "./box";

const baseStyles = {
  display: "inline-block",
  verticalAlign: "super",
  fontSize: 0,
  fontWeight: "bold",
  whiteSpace: "nowrap",
  px: 1,
  borderRadius: 4,
  color: "white",
  bg: "primary",
};

const Badge = React.forwardRef((props, ref) => (
  <Box ref={ref} as="span" __css={baseStyles} {...props} __themeKey="badges" />
));

export default Badge;
