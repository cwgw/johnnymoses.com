/**
 * @link http://www.losttype.com/font/?name=mort-modern-pro
 */
import mortModernTextLightWOFF2 from "./mortmodern-23textlight-webfont.woff2";
import mortModernTextLightWOFF from "./mortmodern-23textlight-webfont.woff";
import mortModernBoldWOF2F from "./mortmodern-11bold-webfont.woff2";
import mortModernBoldWOFF from "./mortmodern-11bold-webfont.woff";

export default [
  {
    fontFamily: "Mort Modern",
    src: `url('${mortModernTextLightWOFF2}') format('woff2),
          url('${mortModernTextLightWOFF}') format('woff)`,
    fontWeight: 300,
    fontStyle: "normal",
    fontDisplay: "swap",
  },
  {
    fontFamily: "Mort Modern",
    src: `url('${mortModernBoldWOF2F}') format('woff2),
          url('${mortModernBoldWOFF}') format('woff)`,
    fontWeight: "bold",
    fontStyle: "normal",
    fontDisplay: "swap",
  },
];
