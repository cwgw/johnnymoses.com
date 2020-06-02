import React from "react";
import uniqueId from "lodash/uniqueId";

import Box from "./box";
import Label from "./label";
import Input from "./input";
import Textarea from "./textarea";

const FormField = ({ label, name, type, className, ...props }) => {
  const id = React.useRef(uniqueId("input"));

  return (
    <Box className={className} variant={"forms.field"}>
      <Label htmlFor={id.current}>{label}</Label>
      {type === "textarea" ? (
        <Textarea id={id.current} name={name} {...props} />
      ) : (
        <Input id={id.current} type={type} name={name} {...props} />
      )}
    </Box>
  );
};

export default FormField;
