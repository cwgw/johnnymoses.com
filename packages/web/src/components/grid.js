import styled from "@emotion/styled";
import { css, get } from "@theme-ui/css";
import { createShouldForwardProp } from "@styled-system/should-forward-prop";
import { compose } from "styled-system";
import border from "@styled-system/border";
import color from "@styled-system/color";
import layout from "@styled-system/layout";
import position from "@styled-system/position";
import space from "@styled-system/space";
import typography from "@styled-system/typography";
import grid from "@styled-system/grid";

const shouldForwardProp = createShouldForwardProp([
  ...border.propNames,
  ...color.propNames,
  ...grid.propNames,
  ...layout.propNames,
  ...position.propNames,
  ...space.propNames,
  ...typography.propNames,
]);

const baseStyles = {
  boxSizing: "border-box",
  display: "grid",
  gridGap: 3,
  margin: 0,
  padding: 0,
  minWidth: 0,
  listStyle: "none",
};

const sx = props => css(props.sx)(props.theme);
const base = props => css(props.__css || baseStyles)(props.theme);
const variant = ({ theme, variant, __themeKey = "grids" }) => {
  return css(get(theme, __themeKey + "." + variant, get(theme, variant)));
};

const countToColumns = n => {
  if (Array.isArray(n)) {
    return n.map(countToColumns);
  }
  const col = `1fr `;
  return !!n && (typeof n === "number" ? col.repeat(n).trim() : n);
};

const columns = props => {
  if (!!props.columns) {
    return css({ gridTemplateColumns: countToColumns(props.columns) });
  }
};

export const Grid = styled("div", {
  shouldForwardProp,
})(
  base,
  variant,
  columns,
  compose(border, color, grid, layout, position, space, typography),
  sx,
  props => props.css
);

export default Grid;
