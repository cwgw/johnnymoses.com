import border from "@styled-system/border";
import color from "@styled-system/color";
import layout from "@styled-system/layout";
import position from "@styled-system/position";
import space from "@styled-system/space";
import typography from "@styled-system/typography";

import { systemComponent } from "../utils/style";

const Box = systemComponent("div", {
  systemProps: [border, color, layout, position, space, typography],
  baseStyles: {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    minWidth: 0,
    listStyle: "none",
  },
});

export default Box;
