import * as tokens from "./tokens";

const theme = {
  // Tokens
  ...tokens,

  // Globals
  styles: {
    root: {
      margin: 0,
      "*": {
        boxSizing: "border-box",
      },
    },
    a: {
      color: "link",
      "&, &:link, &:visited": {
        color: "link",
      },
    },
  },

  // Components
  buttons: {
    primary: {
      background: "transparent",
      borderColor: "text",
      color: "text",
      borderStyle: "solid",
      borderWidth: 1,
      cursor: "pointer",
    },
  },

  text: {
    display1: {
      fontSize: 5,
    },
  },

  forms: {
    field: {
      mb: 3,
    },
  },

  links: {
    nav: {
      display: "inline-block",
      py: 2,
      px: 4,
      fontSize: 4,
      background: "transparent",
      color: "text",
      textDecoration: "none",
      whitespace: "nowrap",
    },
    span: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
      display: "block",
    },
  },
};

export default theme;
