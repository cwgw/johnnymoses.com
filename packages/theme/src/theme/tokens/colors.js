
const namedColors = {
  // reds
  darkRed:  '#c3393d',
  red:  '#ff4136',
  lightRed:  '#ff725c',

  // orange
  orange:  '#ff6300',

  // gold
  gold:  '#ffb700',

  // yellows
  yellow:  '#ffd700',
  lightYellow:  '#fbf1a9',

  // purple
  purple:  '#5e2ca5',
  lightPurple:  '#a463f2',

  // pink
  darkPink:  '#d5008f',
  hotPink: '#ff41b4',
  pink:  '#ff80cc',
  lightPink:  '#ffa3d7',

  // green
  darkGreen:  '#137752',
  green:  '#19a974',
  lightGreen:  '#9eebcf',

  // blue
  navy:  '#001b44',
  darkBlue:  '#00449e',
  blue:  '#357edd',
  lightBlue:  '#96ccff',
  lightestBlue:  '#cdecff',

  // washed/muted colors
  washedBlue:  '#f6fffe',
  washedGreen:  '#e8fdf5',
  washedYellow:  '#fffceb',
  washedRed:  '#ffdfdf',
}

const grays = {
  100: "#111",
  200: "#333",
  300: "#555",
  400: "#777",
  500: "#999",
  600: "#aaa",
  700: "#ccc",
  800: "#eee",
  900: "#f4f4f4",
}

export const colors = {
  ...namedColors,
  grays,
  background: "white",
  text: grays["200"],
  primary: "sienna",
  link: "sienna",

};
