import { get } from "theme-ui";

export const buttons = {
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  banner: {
    variant: "links.banner",
    border: "none",
    borderRadius: 0,
    ":focus": {
      variant: "utils.focus",
    },
  },

  secondary: {
    color: "text",
    ":active": {
      transform: "translateY(1px)",
    },
    ":hover": {
      backgroundColor: "grays.900",
    },
    ":focus": {
      variant: "utils.focus",
    },
    ":disabled": {
      variant: "buttons.disabled",
    },
  },

  cta: {
    display: "block",
    p: 3,
    fontSize: 2,
    backgroundColor: "white",
    borderColor: "grays.800",
    borderRadius: 8,
    boxShadow: 5,
    ":active": {
      transform: "translateY(1px)",
    },
    ":hover": {
      backgroundColor: "grays.900",
    },
    ":focus": {
      variant: "utils.focus",
    },
    ":disabled": {
      variant: "buttons.disabled",
    },
    svg: {
      mr: 3,
      fontSize: 4,
      verticalAlign: "-0.25em",
    },
  },

  primary: {
    borderColor: "primary",
    backgroundColor: "primary",
    color: "white",
    ":active": {
      transform: "translateY(1px)",
    },
    ":not(:disabled):hover": {
      backgroundColor: "text",
      borderColor: "text",
    },
    ":focus": {
      variant: "utils.focus",
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
    ":focus": {
      variant: "utils.focus",
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

  inline: {
    display: "inline",
    verticalAlign: "baseline",
    px: 2,
    py: 1,
  },

  link: {
    padding: 0,
    border: "none",
    borderRadius: 0,
    variant: "styles.a",
    ":focus": {
      variant: "utils.focus",
    },
  },

  plain: {
    variant: "links.plain",
    padding: 0,
    border: "none",
    borderRadius: 0,
  },
};

export const buttonGroup = {
  item: {
    "[data-direction='vertical'] &": {
      borderRadius: 0,
      mt: "-1px",
      ":first-of-type": {
        mt: 0,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      },
      ":last-of-type": {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
      },
    },
  },
};

export const links = {
  banner: {
    display: "block",
    p: 2,
    fontSize: 2,
    background: "transparent",
    color: "text",
    textDecoration: "none",
    whiteSpace: "nowrap",
    userSelect: "none",
    ":hover, :focus": {
      color: "focus",
    },
    ":focus": {
      variant: "utils.focus",
    },
  },

  nav: {
    display: "inline-block",
    p: 2,
    color: "text",
    textDecoration: "none",
    ":hover, :focus": {
      textDecoration: "underline",
      color: "focus",
    },
    ":focus": {
      variant: "utils.focus",
    },
  },

  plain: {
    color: "text",
    textDecoration: "none",
    ":focus, :hover, :active": {
      textDecoration: "underline",
    },
    ":focus": {
      variant: "utils.focus",
      color: "background",
      backgroundColor: "focus",
    },
  },

  fill: {
    color: "text",
    textDecoration: "none",
    ":focus, :hover, :active": {
      textDecoration: "underline",
      color: "focus",
      outline: "none",
    },
    "::after": {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      content: "''",
    },
    ":focus::after": {
      variant: "utils.focus",
    },
  },

  skipNav: {
    variant: ["utils.visuallyHidden", "links.banner"],
    top: 2,
    left: 2,

    ":focus": {
      variant: "utils.focus",
      backgroundColor: "focus",
      color: "background",
      width: "auto",
      height: "auto",
      m: 0,
      clip: "initial",
      overflow: "visible",
    },
  },
};

export const text = {
  eyebrow: {
    color: "grays.500",
    fontWeight: "bold",
    letterSpacing: "0.025em",
    textTransform: "uppercase",
  },

  display1: {
    fontFamily: "serif",
    fontSize: 5,
    lineHeight: "heading",
    mb: 3,
  },

  display2: {
    fontFamily: "serif",
    fontSize: 4,
    fontWeight: "light",
    lineHeight: "heading",
    mb: 3,
  },

  small: {
    fontSize: 1,
  },

  strong: {
    fontWeight: "bold",
  },

  plain: {
    fontWeight: "normal",
    fontSize: 2,
    fontFamily: "body",
    color: "text",
  },
};

export const forms = {
  field: {
    display: "flex",
    flexFlow: "column nowrap",
    mb: 3,
  },

  label: {
    "[data-required-field='true'] &": {
      "::after": {
        content: "'*'",
        color: "darkRed",
      },
    },
  },

  hint: {
    color: "grays.600",
    fontSize: 1,
    order: 1,
  },

  input: {
    ":focus": {
      variant: "utils.focus",
    },
  },

  textarea: {
    "::placeholder": {
      color: "grays.600",
      opacity: 1,
    },
    ":focus": {
      variant: "utils.focus",
    },
  },
};

export const container = {
  width: "100%",
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

  focus: {
    outline: "none",
    boxShadow: theme => `0 0 0 3px ${get(theme, "colors.focus")}`,
    transition: "box-shadow 200ms",
  },

  truncate: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "100%",
    overflow: "hidden",
  },
};

export const products = {
  price: {
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
    verticalAlign: "-0.15em",
    fontSize: "inherit",
    color: "inherit",
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

export const menuButton = {
  list: {
    my: 2,
    py: 2,
    boxShadow: 5,
    backgroundColor: "white",
    zIndex: "popover",
  },

  link: {
    display: "block",
    px: 3,
    py: 2,
    color: "inherit",
    font: "inherit",
    textDecoration: "initial",
    fontSize: 1,
    cursor: "pointer",
    "&[data-selected]": {
      color: "link",
      variant: "utils.focus",
    },
  },
};

export const flyoutMenu = {
  list: {
    p: 3,
    // px: 4,
    // py: 3,
    backgroundColor: "background",
    boxShadow: 5,
    border: "1px solid",
    borderColor: "grays.800",
  },

  link: {
    variant: "links.banner",
  },
};

export const listbox = {
  input: {
    p: 2,
    borderRadius: 3,
    border: "1px solid",
    borderColor: "grays.500",
    ":hover": {
      backgroundColor: "grays.900",
    },
    ":focus": {
      variant: "utils.focus",
    },
    ":disabled": {
      variant: "buttons.disabled",
    },
  },

  list: {
    py: 1,
    borderRadius: 3,
    backgroundColor: "background",
    boxShadow: 5,
  },

  option: {
    py: 2,
    px: 3,
    "&[aria-selected]": {
      color: "background",
      backgroundColor: "focus",
    },
    "&[data-current]": {
      fontWeight: "bolder",
    },
    "&[aria-disabled]": {
      variant: "buttons.disabled",
    },
  },
};

export const thematicBreak = {
  horizontal: {
    display: "block",
    width: "100%",
    height: 1,
    my: 3,
    border: "none",
    backgroundColor: "grays.700",
  },

  vertical: {
    display: "inline-block",
    width: 1,
    height: "1em",
    mx: 3,
    border: "none",
    backgroundColor: "grays.700",
    verticalAlign: "middle",
  },

  separator: {
    display: "block",
    height: 1,
    mx: 2,
    border: "none",
    backgroundColor: "grays.700",
  },
};
