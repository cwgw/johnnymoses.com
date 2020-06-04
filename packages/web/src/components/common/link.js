import React from "react";
import { Link as GatsbyLink } from "gatsby";

import { Box } from "./box";

const Link = React.forwardRef(({ to, href, ...props }, ref) => {
  const isInternal = /^\/(?!\/)/.test(to);

  const internalLinkProps = {
    as: GatsbyLink,
    to,
  };

  const externalLinkProps = {
    as: "a",
    href: to || href,
    rel: "noreferrer",
    target: "_blank",
  };

  return (
    <Box
      ref={ref}
      {...(isInternal ? internalLinkProps : externalLinkProps)}
      variant="styles.a"
      __themeKey="links"
      {...props}
    />
  );
});

export { Link };
