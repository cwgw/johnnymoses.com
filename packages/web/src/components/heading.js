import React from "react";

import Box from "./box";

const defaultProps = {
  as: "h2",
};

const Heading = React.forwardRef(({ as, ...props }, ref) => (
  <Box
    ref={ref}
    as={as}
    variant={`styles.${as}`}
    {...props}
    __themeKey="text"
  />
));

Heading.defaultProps = defaultProps;

export default Heading;
