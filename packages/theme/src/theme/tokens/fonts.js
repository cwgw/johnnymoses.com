const system = [
  "-apple-system",
  "'BlinkMacSystemFont'",
  "'Segoe UI'",
  "'Roboto'",
  "'Helvetica Neue'",
  "'Arial'",
  "'Noto Sans'",
  "sans-serif",
  "'Apple Color Emoji'",
  "'Segoe UI Emoji'",
  "'Segoe UI Symbol'",
  "'Noto Color Emoji'",
];

const sans = ["'Manrope'", ...system];

const serif = [
  "'Mort Modern'",
  "'Georgia'",
  "'Palatino'",
  "'Times New Roman'",
  "'Times'",
  "serif",
];

export const fonts = {
  sans: sans.join(", "),
  serif: serif.join(", "),
  body: sans.join(", "),
  lushootseed: ["'Lushootseed Sulad'"].concat(sans).join(", "),
};
