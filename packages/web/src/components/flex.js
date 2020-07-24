import border from "@styled-system/border";
import flexbox from "@styled-system/flexbox";
import layout from "@styled-system/layout";
import position from "@styled-system/position";
import space from "@styled-system/space";
import typography from "@styled-system/typography";

import { systemComponent } from "../utils/style";

const Flex = systemComponent("div", {
  systemProps: [border, flexbox, layout, position, space, typography],
  baseStyles: {
    display: "flex",
    margin: 0,
    padding: 0,
    minWidth: 0,
    flexWrap: "nowrap",
    boxSizing: "border-box",
    listStyle: "none",
  },
});

export default Flex;
