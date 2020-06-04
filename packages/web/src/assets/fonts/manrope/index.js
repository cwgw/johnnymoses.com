/**
 * @link https://manropefont.com/
 */

import ManropeRegularWOFF2 from "./Manrope-Regular.woff2";
import ManropeRegularWOFF from "./Manrope-Regular.woff";
import ManropeExtraBoldWOFF2 from "./Manrope-ExtraBold.woff2";
import ManropeExtraBoldWOFF from "./Manrope-ExtraBold.woff";

export default [
  {
    fontFamily: "'Manrope'",
    src: `url('${ManropeRegularWOFF2}') format('woff2'),
          url('${ManropeRegularWOFF}') format('woff')`,
    fontWeight: "normal",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
  {
    fontFamily: "'Manrope'",
    src: `url('${ManropeExtraBoldWOFF2}') format('woff2'),
          url('${ManropeExtraBoldWOFF}') format('woff')`,
    fontWeight: "bold",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
];
