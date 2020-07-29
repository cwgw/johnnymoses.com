export const root = {
  margin: 0,
  fontFamily: "body",
  fontWeight: "normal",
  fontSize: 2,
  lineHeight: "body",
  "*": {
    boxSizing: "border-box",
  },
};

export const h1 = {
  mt: 0,
  mb: 3,
  fontFamily: "sans",
  fontSize: 4,
  fontWeight: "bold",
  lineHeight: "heading",
};

export const h2 = {
  mt: 0,
  mb: 3,
  fontFamily: "sans",
  fontSize: 3,
  fontWeight: "bold",
  lineHeight: "heading",
};

export const h3 = {
  mt: 0,
  mb: 3,
  fontFamily: "sans",
  fontSize: 3,
  fontWeight: "bold",
  lineHeight: "heading",
};

export const p = {
  mt: 0,
  mb: 3,
};

export const a = {
  color: "link",
  textDecoration: "none",

  "&:hover, &:focus, &:active": {
    textDecoration: "underline",
  },

  ":focus": {
    variant: "utils.focus",
    color: "background",
    backgroundColor: "focus",
  },
};

export const hr = {
  border: "none",
  backgroundColor: "grays.700",
  width: "100%",
  height: 1,
  display: "block",
  my: 3,
};
