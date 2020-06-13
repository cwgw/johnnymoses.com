import React from "react";
import styled from "@emotion/styled";
import space from "@styled-system/space";
import color from "@styled-system/color";
import { css, get } from "@theme-ui/css";
import { Link as GatsbyLink } from "gatsby";

import createShouldForwardProp from "../../utils/shouldForwardProp";

const shouldForwardProp = createShouldForwardProp({
  nope: [...space.propNames, ...color.propNames],
  yep: ["to", "state"],
});

const sx = props => css(props.sx)(props.theme);
const base = props => css(props.__css)(props.theme);
const variant = ({ theme, variant, __themeKey = "variants" }) =>
  css(get(theme, __themeKey + "." + variant, get(theme, variant)));

export const StyledLink = styled("a", {
  shouldForwardProp,
})(base, variant, space, color, sx, props => props.css);

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
    <StyledLink
      ref={ref}
      {...(isInternal ? internalLinkProps : externalLinkProps)}
      variant="styles.a"
      __themeKey="links"
      {...props}
    />
  );
});

export { Link };
