export const buttons = {
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  secondary: {
    color: "text",
    ":hover": {
      backgroundColor: "grays.900",
    },
    ":disabled": {
      variant: "buttons.disabled",
    },
  },

  primary: {
    borderColor: "primary",
    backgroundColor: "primary",
    color: "white",
    ":hover": {
      backgroundColor: "text",
      borderColor: "text",
    },
    ":disabled": {
      variant: "buttons.disabled",
    },
  },

  tile: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    px: 4,
    borderColor: "grays.600",
    ":hover": {
      backgroundColor: "grays.900",
    },
    "&[data-checked='true']": {
      borderColor: "primary",
      backgroundColor: "transparent",
    },
  },

  submit: {
    variant: "buttons.primary",
    width: "100%",
  },

  link: {
    padding: 0,
    border: "none",
    variant: "styles.a",
  },
};

export const links = {
  banner: {
    display: "inline-block",
    p: 2,
    fontSize: 3,
    background: "transparent",
    color: "text",
    textDecoration: "none",
    whitespace: "nowrap",
  },

  nav: {
    display: "inline-block",
    p: 2,
    color: "link",
    fontWeight: "bold",
    textDecoration: "none",
  },

  fill: {
    "::after": {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      content: "''",
    },
  },
};

export const text = {
  eyebrow: {
    color: "grays.400",
    fontWeight: "bold",
    letterSpacing: "0.025em",
    textTransform: "uppercase",
  },

  display1: {
    fontFamily: "serif",
    fontSize: 5,
  },

  display2: {
    fontFamily: "serif",
    fontSize: 4,
    fontWeight: "light",
  },

  small: {
    fontSize: 1,
  },

  strong: {
    fontWeight: "bold",
  },

  body: {
    fontWeight: "normal",
    fontSize: 2,
    fontFamily: "body",
    color: "text",
  },
};

export const formFields = {
  default: {
    fontSize: 2,
    lineHeight: "body",
  },
};

export const container = {
  maxWidth: "full",
  mx: "auto",
};

export const utils = {
  span: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "block",
  },

  visuallyHidden: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    border: "0",
    clip: "rect(0 0 0 0)",
    overflow: "hidden",
  },
};

export const skipNav = {
  variant: "utils.visuallyHidden",
  "&:focus": {
    width: "auto",
    height: "auto",
    px: 3,
    py: 2,
    m: 0,
    backgroundColor: "background",
    clip: "initial",
    overflow: "visible",
  },
};

export const products = {
  price: {
    color: "darkRed",
    fontWeight: "bold",
  },
  salePrice: {
    fontWeight: "bold",
    color: "darkGreen",
  },
  compareAtPrice: {
    color: "grays.400",
    fontWeight: "regular",
    textDecoration: "line-through",
  },
};

export const cart = {};

export const icons = {
  default: {
    display: "inline-block",
    height: "1em",
    width: "1em",
    verticalAlign: "-0.1em",
    fontSize: "inherit",
    color: "grays.400",
  },

  tile: {
    display: "inline-block",
    height: "1em",
    width: "1em",
    m: 0,
    fontSize: 5,
    color: "grays.600",
    "[data-checked='true'] &, [aria-selected='true'] &, [aria-checked='true'] &": {
      color: "primary",
    },
    "& *": {
      strokeWidth: 2,
    },
  },
};
