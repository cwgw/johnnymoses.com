/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useField } from "@zendeskgarden/container-field";

import autocomplete from "../utils/getAutocomplete";
import { includeSpaceProps, omitSpaceProps } from "../utils/filterProps";

import Box from "./box";
import Counter from "./counter";
import Input from "./input";
import Label from "./label";
import Textarea from "./textarea";
import Tiles from "./tiles";
import Text from "./text";
import Listbox from "./listbox";

const InputComponent = React.forwardRef(({ type, ...props }, ref) => {
  switch (type) {
    case "select":
    case "listbox": {
      return <Listbox ref={ref} {...props} />;
    }
    case "number":
    case "counter": {
      return <Counter ref={ref} {...props} />;
    }
    case "textarea": {
      return <Textarea ref={ref} {...props} />;
    }
    case "tiles": {
      return <Tiles ref={ref} {...props} />;
    }
    default: {
      return <Input type={type} ref={ref} {...props} />;
    }
  }
});

const FormField = React.forwardRef(
  ({ className, hint, label, name, required, type, ...props }, ref) => {
    const { getLabelProps, getInputProps, getHintProps } = useField(name);

    return (
      <Box
        data-required-field={required}
        variant="field"
        className={className}
        __themeKey="forms"
        {...includeSpaceProps(props)}
      >
        <Label {...getLabelProps()}>{label}</Label>
        {hint && (
          <Text variant="forms.hint" as="span" {...getHintProps()}>
            {hint}
          </Text>
        )}
        <InputComponent
          required={required}
          name={name}
          autoComplete={autocomplete(name)}
          ref={ref}
          type={type}
          {...getInputProps({}, { isDescribed: !!hint })}
          {...omitSpaceProps(props)}
        />
      </Box>
    );
  }
);

export default FormField;
