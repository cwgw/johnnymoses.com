import React from "react";

import Box from "./box";
import Link from "./link";

const baseStyles = {
  display: "inline-block",
  px: 3,
  py: 2,
  border: 0,
  borderStyle: "solid",
  borderRadius: 4,
  borderColor: "currentColor",
  borderWidth: 1,
  textDecoration: "none",
  backgroundColor: "transparent",
  color: "text",
  fontSize: "inherit",
  fontFamily: "inherit",
  lineHeight: "inherit",
  textAlign: "center",
  appearance: "none",
  cursor: "pointer",
};

const Button = React.forwardRef(({ to, href, ...props }, ref) => {
  const url = to || href;
  if (url) {
    return (
      <Link
        ref={ref}
        to={url}
        variant="primary"
        __themeKey="buttons"
        __css={baseStyles}
        {...props}
      />
    );
  }

  return (
    <Box
      as="button"
      ref={ref}
      variant="primary"
      __themeKey="buttons"
      __css={baseStyles}
      type="button"
      {...props}
    />
  );
});

export default Button;
