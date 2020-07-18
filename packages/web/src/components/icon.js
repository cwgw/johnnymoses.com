import React from "react";
import * as Icons from "react-feather";

import Text from "./text";

const baseStyles = {
  "& *": {
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke",
  },
};

const Icon = ({ icon, ...props }) => {
  return (
    <Text
      as={Icons[icon]}
      variant="default"
      aria-hidden="true"
      {...props}
      __themeKey="icons"
      __css={baseStyles}
    />
  );
};

export default Icon;
