export const root = {
  margin: 0,
  fontFamily: "body",
  fontWeight: "normal",
  fontSize: 2,
  "*": {
    boxSizing: "border-box",
  },
};

export const a = {
  color: "link",
  textDecoration: "none",
  "&:hover, &:focus, &:active": {
    textDecoration: "underline",
  },
};

export const h1 = {
  fontFamily: "serif",
};

export const h2 = {
  my: 3,
  fontSize: 3,
  fontFamily: "sans",
  fontWeight: "bold",
};

export const h3 = {
  fontFamily: "sans",
  fontWeight: "bold",
  fontSize: 3,
};
