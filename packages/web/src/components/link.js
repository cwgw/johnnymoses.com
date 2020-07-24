import React from "react";
import { Link as GatsbyLink } from "gatsby";
import space from "@styled-system/space";
import color from "@styled-system/color";
import isAbsoluteUrl from "is-absolute-url";

import { systemComponent } from "../utils/style";

const StyledLink = systemComponent("a", {
  systemProps: [space, color],
  themeKey: "links",
  shouldForwardProp: ["to", "state"],
});

StyledLink.defaultProps = {
  variant: "styles.a",
};

const Link = React.forwardRef(({ href, to, ...props }, ref) => {
  const url = to || href;

  let _props = {
    href: url,
    rel: "noreferrer",
    target: "_blank",
  };

  if (url && !isAbsoluteUrl(url)) {
    _props = {
      as: GatsbyLink,
      to: url,
    };
  }

  return <StyledLink ref={ref} {..._props} {...props} />;
});

export default Link;
