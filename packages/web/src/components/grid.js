/**
 * ThemeUI Grid source with minor changes
 *  - remove `width` prop (conflicts with `layout` style-prop
 *    which I've added to Box)
 */
import React from "react";
import Box from "./box";

const defaultProps = {
  gap: 3,
  columns: 2,
};

const baseStyles = {
  display: "grid",
};

const countToColumns = n =>
  Array.isArray(n)
    ? n.map(countToColumns)
    : !!n && (typeof n === "number" ? `repeat(${n}, 1fr)` : n);

const Grid = React.forwardRef(({ columns, gap, ...props }, ref) => {
  const gridTemplateColumns = countToColumns(columns);

  return (
    <Box
      ref={ref}
      __themeKey="grids"
      {...props}
      __css={{
        ...baseStyles,
        gridGap: gap,
        gridTemplateColumns,
      }}
    />
  );
});

Grid.defaultProps = defaultProps;

export default Grid;
