import React from "react";
import styled from "@emotion/styled";
import space from "@styled-system/space";
import color from "@styled-system/color";
import { css, get } from "@theme-ui/css";
import { Link as GatsbyLink } from "gatsby";
import isAbsoluteUrl from "is-absolute-url";

import createShouldForwardProp from "../utils/shouldForwardProp";

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

const Link = React.forwardRef((
  {
    href,
    to,
    ...props
  },
  ref
) => {
    const url = to || href;

    let _props = {
      href: url,
      rel: "noreferrer",
      target: "_blank",
    };

    if (!isAbsoluteUrl(url)) {
      _props = {
        as: GatsbyLink,
        to: url,
      };
    }

    return (
      <StyledLink
        ref={ref}
        variant="styles.a"
        {..._props}
        {...props}
        __themeKey="links"
      />
    );
  }
);

export default Link;
