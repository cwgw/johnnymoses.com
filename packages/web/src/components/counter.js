/** @jsx jsx */
import { jsx } from "@theme-ui/core";
import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import Box from "./box";
import Icon from "./icon";

const propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
};

const defaultProps = {
  max: 99,
  min: 1,
  step: 1,
};

const Button = ({ children, ...props }) => (
  <button
    sx={{
      display: "inline-block",
      flex: "0 0 auto",
      width: "1.5em",
      height: "1.5em",
      p: 0,
      m: 0,
      border: "none",
      backgroundColor: "transparent",
      // borderWidth: 1,
      // borderStyle: "solid",
      // borderColor: "grays.800",
      // borderRadius: "100%",
      // backgroundColor: "white",
      fontSize: 1,
      textAlign: "center",
      cursor: "pointer",
      outline: "none",
      ":not(:disabled):hover": {
        backgroundColor: "grays.900",
      },
      ":disabled": {
        color: "grays.800",
        cursor: "default",
      },
      svg: {
        color: "inherit",
      },
    }}
    {...props}
    type="button"
  >
    {children}
  </button>
);

const Input = props => (
  <input
    sx={{
      display: "inline-block",
      width: "100%",
      maxWidth: "2em",
      py: 0,
      px: 0,
      m: 0,
      appearance: "none",
      fontSize: "inherit",
      lineHeight: "inherit",
      border: "none",
      color: "inherit",
      background: "transparent",
      textAlign: "center",
      MozAppearance: "textfield",
      "::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
      },
      "&:active, &:focus": {
        outline: "none",
      },
    }}
    {...props}
  />
);

const reducer = (state, [type, payload]) => {
  switch (type) {
    case "INCREMENT": {
      const { onChange } = payload;
      const value = state + 1;
      onChange(value);
      return value;
    }
    case "DECREMENT": {
      const { onChange } = payload;
      const value = state - 1;
      onChange(value);
      return value;
    }
    case "CHANGE": {
      const { value, onChange } = payload;
      onChange(value);
      return value;
    }
    default: {
      return state;
    }
  }
};

const Quantity = ({
  max,
  min,
  onChange,
  step,
  label,
  name,
  value: controlledValue,
  disabled,
  id,
  ...props
}) => {
  const [value, dispatch] = React.useReducer(reducer, controlledValue);
  const handleChange = e => {
    const value = parseInt(e.target.value);
    dispatch(["CHANGE", { value, onChange: debouncedOnChange }]);
  };

  const debouncedOnChange = React.useCallback(
    debounce(
      val => {
        onChange(val);
      },
      500,
      { trailing: true }
    ),
    [onChange]
  );

  const handleIncrement = () => {
    dispatch(["INCREMENT", { onChange: debouncedOnChange }]);
  };

  const handleDecrement = () => {
    dispatch(["DECREMENT", { onChange: debouncedOnChange }]);
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexFlow: "row nowrap",
        alignSelf: "start",
        alignItems: "center",
        border: "1px solid",
        borderColor: "grays.800",
        textAlign: "center",
        ":focus-within": {
          variant: "utils.focus",
        },
      }}
      {...props}
    >
      <Button
        onClick={handleDecrement}
        disabled={disabled || value <= 1}
        aria-hidden="true"
        tabIndex="-1"
      >
        <Icon icon="Minus" />
      </Button>
      <Input
        type="number"
        onChange={handleChange}
        id={id}
        value={value}
        size={2}
        max={max}
        min={min}
        step={step}
        disabled={disabled}
      />
      <Button
        onClick={handleIncrement}
        disabled={disabled}
        aria-hidden="true"
        tabIndex="-1"
      >
        <Icon icon="Plus" />
      </Button>
    </Box>
  );
};

Quantity.propTypes = propTypes;

Quantity.defaultProps = defaultProps;

export default Quantity;
