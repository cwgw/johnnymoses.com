const scale = ["36em", "54em"];

const aliases = { md: scale[0], lg: scale[1] };

const breakpoints = Object.entries(aliases).reduce(
  (a, [k, v]) => Object.assign(a, { [k]: v }),
  scale
);

export default breakpoints;
