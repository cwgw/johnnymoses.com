import React from "react";

import { Box } from "./box";
import { Link } from "./link";

const baseStyles = {
  appearance: "none",
  display: "inline-block",
  textAlign: "center",
  lineHeight: "inherit",
  textDecoration: "none",
  fontSize: "inherit",
  px: 3,
  py: 2,
  color: "white",
  bg: "primary",
  border: 0,
  borderRadius: 4,
};

const Button = React.forwardRef(({ to, ...props }, ref) => (
  <Box
    as={to ? Link : null}
    ref={ref}
    variant="primary"
    __themeKey="buttons"
    __css={baseStyles}
    {...props}
  />
));

export { Button };
