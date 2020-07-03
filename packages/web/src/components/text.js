import React from "react";

import Box from "./box";

const Text = React.forwardRef((props, ref) => (
  <Box ref={ref} __themeKey="text" {...props} />
));

export default Text;
