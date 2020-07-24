import React from "react";

import Text from "./text";

const ThematicBreak = props => (
  <Text as="hr" __themeKey="thematicBreak" variant="styles.hr" {...props} />
);

export default ThematicBreak;
