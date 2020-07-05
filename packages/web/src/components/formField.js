import React from "react";
import uniqueId from "lodash/uniqueId";
import getAutocomplete from "../utils/getAutocomplete";

import Box from "./box";
import Label from "./label";
import Input from "./input";
import Textarea from "./textarea";
import Quantity from './quantity'

const baseStyles = {
  mb: 3,
};

const FormField = React.forwardRef(
  ({ label, name, required, type, className, ...props }, ref) => {
    const id = React.useRef(uniqueId("input"));
    const components = {
      textarea: Textarea,
      quantity: Quantity,
    }
    const InputElement = components[type] || Input;
    return (
      <Box
        className={className}
        __css={baseStyles}
        __themeKey="formFields"
        variant="default"
      >
        <Label required={required} htmlFor={id.current}>
          {label}
        </Label>
        <InputElement
          required={required}
          ref={ref}
          id={id.current}
          type={components[type] ? null : type}
          name={name}
          autoComplete={getAutocomplete(name)}
          {...props}
        />
      </Box>
    );
  }
);

export default FormField;
