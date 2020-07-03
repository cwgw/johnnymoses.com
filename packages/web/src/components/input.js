import React from "react";

import Box from "./box";

const baseStyles = {
  display: "block",
  width: "100%",
  p: 2,
  appearance: "none",
  fontSize: "inherit",
  lineHeight: "inherit",
  border: "1px solid",
  borderRadius: 4,
  color: "inherit",
  bg: "transparent",
};

const Input = React.forwardRef((props, ref) => (
  <Box ref={ref} as="input" __css={baseStyles} __themeKey="forms" {...props} />
));

export default Input;
