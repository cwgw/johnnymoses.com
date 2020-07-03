import React from "react";

import Box from "./box";

const defaultProps = {
  rows: 8,
};

const baseStyles = {
  display: "block",
  width: "100%",
  p: 2,
  border: "1px solid",
  borderRadius: 4,
  fontSize: "inherit",
  fontFamily: "inherit",
  lineHeight: "inherit",
  appearance: "none",
  backgroundColor: "transparent",
  color: "inherit",
};

const Textarea = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="textarea"
    __themeKey="forms"
    __css={baseStyles}
    {...props}
  />
));

Textarea.defaultProps = defaultProps;

export default Textarea;
