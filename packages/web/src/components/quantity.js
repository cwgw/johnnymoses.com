/** @jsx jsx */
import { jsx } from "@theme-ui/core";
import PropTypes from "prop-types";

const propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
};

const defaultProps = {
  max: null,
  min: 0,
  step: 1,
};

const Button = ({ children, ...props }) => (
  <button
    sx={{
      display: "inline-block",
      width: "1.5em",
      height: "1.5em",
      fontSize: "inherit",
      textAlign: "center",
      p: 0,
      m: 0,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "lightGray",
      borderRadius: "100%",
      backgroundColor: "white",
      cursor: "pointer",
    }}
    {...props}
  >
    <span
      sx={{
        verticalAlign: "0.05em",
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  </button>
);

const Quantity = ({
  max,
  min,
  onChange,
  step,
  label,
  name,
  value,
  disabled,
  ...props
}) => {
  const handleIncrement = () => {
    onChange(parseInt(value, 10) + 1);
  };

  const handleDecrement = () => {
    onChange(parseInt(value, 10) - 1);
  };

  return (
    <div
      sx={{
        display: "inline-flex",
        flexFlow: "row nowrap",
        alignItems: "baseline",
        textAlign: "center",
      }}
      {...props}
    >
      <Button
        onClick={handleDecrement}
        disabled={disabled || value <= 1}
        children="-"
        tabIndex="-1"
      />
      <span
        sx={{
          minWidth: "2em",
          py: 0,
          px: 2,
        }}
      >
        {value}
      </span>
      <Button
        onClick={handleIncrement}
        disabled={disabled}
        children="+"
        tabIndex="-1"
      />
    </div>
  );
};

Quantity.propTypes = propTypes;

Quantity.defaultProps = defaultProps;

export default Quantity;
