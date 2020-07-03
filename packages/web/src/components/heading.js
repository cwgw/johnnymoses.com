import React from "react";

import Box from "./box";

const defaultProps = {
  as: "h2",
};

const Heading = React.forwardRef(({ as, ...props }, ref) => (
  <Box ref={ref} as={as} variant={`styles.${as}`} _themeKey="text" {...props} />
));

Heading.defaultProps = defaultProps;

export default Heading;
