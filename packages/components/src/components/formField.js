import React from "react";
import uniqueId from "lodash/uniqueId";

import Box from "./box";
import Label from "./label";
import Input from "./input";
import Textarea from "./textarea";

const baseStyles = {
  mb: 3,
};

const FormField = React.forwardRef(
  ({ label, name, type, className, ...props }, ref) => {
    const id = React.useRef(uniqueId("input"));
    return (
      <Box
        ref={ref}
        className={className}
        __css={baseStyles}
        __themeKey="forms.fields"
      >
        <Label htmlFor={id.current}>{label}</Label>
        {type === "textarea" ? (
          <Textarea id={id.current} name={name} {...props} />
        ) : (
          <Input id={id.current} type={type} name={name} {...props} />
        )}
      </Box>
    );
  }
);

export default FormField;
