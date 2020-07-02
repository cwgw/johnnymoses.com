import React from "react";
import uniqueId from "lodash/uniqueId";
import getAutocomplete from "../utils/getAutocomplete";

import Box from "./box";
import Label from "./label";
import Input from "./input";
import Textarea from "./textarea";

const baseStyles = {
  mb: 3,
};

const FormField = React.forwardRef(
  ({ label, name, required, type, className, ...props }, ref) => {
    const id = React.useRef(uniqueId("input"));
    const InputElement = type === "textarea" ? Textarea : Input;
    console.log(getAutocomplete(name));
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
          type={type === "textarea" ? null : type}
          name={name}
          autoComplete={getAutocomplete(name)}
          {...props}
        />
      </Box>
    );
  }
);

export default FormField;
