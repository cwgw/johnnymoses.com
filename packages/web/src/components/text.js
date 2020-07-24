// import styled from '@emotion/styled'
// import { css, get } from '@theme-ui/css'
// import { createShouldForwardProp } from '@styled-system/should-forward-prop'
import space from "@styled-system/space";
import color from "@styled-system/color";
import typography from "@styled-system/typography";

import { systemComponent } from "../utils/style";

// const shouldForwardProp = createShouldForwardProp([
//   ...space.propNames,
//   ...color.propNames,
//   ...typography.propNames,
// ])

// const baseStyles = {
//   boxSizing: "border-box",
//   margin: 0,
//   minWidth: 0,
// }

// const sx = props => css(props.sx)(props.theme)
// const base = props => css(props.__css || baseStyles)(props.theme)
// const variant = ({ as, theme, variant, __themeKey = 'text' }) => {
//   if (variant) {
//     return css(
//       get(theme, `${__themeKey}.${variant}`,
//       get(theme, variant))
//     );
//   }

//   if (as) {
//     return css(get(theme, `styles.${as}`));
//   }

//   return "";
// }

// export const Text = styled('div', {
//   shouldForwardProp,
// })(
//   base,
//   variant,
//   space,
//   color,
//   typography,
//   sx,
//   props => props.css
// )

const Text = systemComponent("div", {
  systemProps: [space, color, typography],
  baseStyles: {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
  },
  variant: ({ css, get }) => ({ as, theme, variant, __themeKey = "text" }) => {
    if (variant) {
      return css(get(theme, `${__themeKey}.${variant}`, get(theme, variant)));
    }

    return !!as && css(get(theme, `styles.${as}`));
  },
});

export default Text;
