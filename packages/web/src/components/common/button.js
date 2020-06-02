import React from "react";
import { Button as UIButton } from "theme-ui";

import Link from "./link";

const Button = ({ to, ...props }) => {
  if (to) {
    return <UIButton as={Link} to={to} {...props} />;
  }

  return <UIButton {...props} />;
};

export default Button;
