export const buttons = {
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  
  primary: {
    borderWidth: 1,
    color: "text",
    ':disabled': {
      variant: 'buttons.disabled'
    }
  },

  secondary: {
    borderWidth: 1,
    borderColor: "grays.300",
    backgroundColor: "grays.300",
    color: "white",
    ':disabled': {
      variant: 'buttons.disabled'
    }
  },

  link: {
    padding: 0,
    variant: 'styles.a',
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
    '::after': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      content: "''",
    }
  }  
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

  body: {
    fontWeight: 'normal',
    fontSize: 2,
    fontFamily: 'body',
    color: 'text',
  }
};

export const formFields = {
  default: {
    fontSize: 2,
    lineHeight: "body",
  },
};

export const container = {
  maxWidth: 'full',
  mx: 'auto',
}

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
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    border: '0',
    clip: 'rect(0 0 0 0)',
    overflow: 'hidden',
  },
};

export const skipNav = {
  variant: 'utils.visuallyHidden',
  '&:focus': {
    width: 'auto',
    height: 'auto',
    px: 3,
    py: 2,
    m: 0,
    backgroundColor: 'background',
    clip: 'initial',
    overflow: 'visible',
  }
}