const namedColors = {
  // reds
  darkRed: "#c3393d",
  red: "#ff4136",
  lightRed: "#ff725c",

  // orange
  orange: "#ff6300",

  // gold
  gold: "#ffb700",

  // yellows
  yellow: "#ffd700",
  lightYellow: "#fbf1a9",

  // purple
  purple: "#634b93",
  lightPurple: "#a463f2",

  // pink
  darkPink: "#d5008f",
  hotPink: "#ff41b4",
  pink: "#ff80cc",
  lightPink: "#ffa3d7",

  // green
  darkGreen: "#137752",
  green: "#19a974",
  lightGreen: "#9eebcf",

  // blue
  navy: "#001b44",
  darkBlue: "#00449e",
  blue: "#357edd",
  lightBlue: "#96ccff",
  lightestBlue: "#cdecff",

  // washed/muted colors
  washedBlue: "#f6fffe",
  washedGreen: "#e8fdf5",
  washedYellow: "#fffceb",
  washedRed: "#ffdfdf",
};

// const grays = {
//   100: "#111",
//   200: "#333",
//   300: "#555",
//   400: "#777",
//   500: "#999",
//   600: "#aaa",
//   700: "#ccc",
//   800: "#eee",
//   900: "#f4f4f4",
// };

const c = {
  mint: "#bcdfa9",
  blue: "#3E8492",
  olive: "#6f621f",
  brick: "#ac3e51",
};

// "colors": [
//   "#bcdfa9",
//   "#3e8492",
//   "#6f621f",
//   "#ac3e51",
//   "#e6335f",
//   "#bde5fe",
// ],

// {
//   "colors": [
//   "#bcdfa9",
//   "#3e8492",
//   "#6f621f",
//   "#ac3e51",
//   "#341017",
//   "#2e6ac4",
//   "#cafcdc",
//   ],
// }

// const tintedGrays = {
//   100: "#241200",
//   200: "#382817",
//   300: "#4d3f30",
//   400: "#63574a",
//   500: "#7b7065",
//   600: "#938a82",
//   700: "#aca59f",
//   800: "#c6c1bd",
//   900: "#e0dedc",
// };

const tintedGrays = {
  900: "#f7f5f3",
  800: "#d9d5d1",
  700: "#bcb6af",
  600: "#a0978f",
  500: "#857a70",
  400: "#6b5e51",
  300: "#524335",
  200: "#3a2a1a",
  100: "#241200",
};

const lightYellowGreen = "#ebffbf";
// const sienna = "#ac5600"
// const brown = "#33271b"
const turquoise = "#49919F";
// const blue = "";
const orange = "#DD5835";

export const colors = {
  ...namedColors,
  // grays,
  grays: tintedGrays,
  background: "white",
  // text: grays["200"],
  // text: tintedGrays["100"],
  text: tintedGrays["200"],
  textMuted: tintedGrays["500"],
  // primary: sienna,
  primary: turquoise,
  link: orange,
  focus: orange,
  lightYellowGreen,
  ...c,
};
