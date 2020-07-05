import fonts from "./fonts";

export default {
  ":root": {
    "--reach-dialog": 1,
    ...fonts.map(font => ({ "@font-face": font })),
  },
};
