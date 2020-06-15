/**
 * Theme-UI Box source with minor changes
 *  - added `layout` style-props
 */
import styled from "@emotion/styled";
import { css, get } from "@theme-ui/css";
import { createShouldForwardProp } from "@styled-system/should-forward-prop";
import space from "@styled-system/space";
import color from "@styled-system/color";
import layout from "@styled-system/layout";

const baseStyles = {
  boxSizing: "border-box",
  margin: 0,
  minWidth: 0,
};

const shouldForwardProp = createShouldForwardProp([
  ...space.propNames,
  ...color.propNames,
  ...layout.propNames,
]);

const sx = props => css(props.sx)(props.theme);
const base = props => css(props.__css)(props.theme);
const variant = ({ theme, variant, __themeKey = "variants" }) =>
  css(get(theme, __themeKey + "." + variant, get(theme, variant)));

const Box = styled("div", {
  shouldForwardProp,
})(baseStyles, base, variant, space, color, layout, sx, props => props.css);

export default Box;
