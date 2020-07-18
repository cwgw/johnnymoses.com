import React from "react";

import Box from "./box";

const baseStyles = {
  width: "100%",
  display: "inline-block",
};

const Label = React.forwardRef(({ children, ...props }, ref) => (
  <Box
    ref={ref}
    as="label"
    variant="styles.label"
    {...props}
    __css={baseStyles}
    __themeKey="forms"
  >
    {children}
  </Box>
));

export default Label;
