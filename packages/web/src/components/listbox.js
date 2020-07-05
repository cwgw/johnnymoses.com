/** @jsx jsx */
import { jsx } from "@theme-ui/core";
import React from "react";
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox";

const inputStyle = {
  "& [data-reach-listbox-button]": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1px 10px 2px",
    border: "1px solid",
    borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
    cursor: "default",
    userSelect: "none",
  },
  '& [data-reach-listbox-button][aria-disabled="true"]': {
    opacity: 0.5,
  },
  "& [data-reach-listbox-arrow]": {
    marginLeft: "0.5rem",
    display: "block",
    fontSize: "0.5em",
  },
  "& [data-reach-listbox-group-label]": {
    display: "block",
    margin: "0",
    padding: "0.25rem 0.5rem",
    whiteSpace: "nowrap",
    userSelect: "none",
    fontWeight: "bolder",
  },
};

const popoverStyle = {
  "&": {
    display: "block",
    position: "absolute",
    minWidth: "min-content",
    padding: "0.25rem 0",
    background: "hsl(0, 0%, 100%)",
    outline: "none",
    border: "solid 1px hsla(0, 0%, 0%, 0.25)",
  },
  "&:focus-within": {
    boxShadow: "0 0 4px Highlight",
    outline: "-webkit-focus-ring-color auto 4px",
  },
  "&[hidden]": {
    display: "none",
  },
  "& [data-reach-listbox-list]": {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  "& [data-reach-listbox-list]:focus": {
    boxShadow: "none",
    outline: "none",
  },
  "& [data-reach-listbox-option]": {
    display: "block",
    margin: "0",
    padding: "0.25rem 0.5rem",
    whiteSpace: "nowrap",
    userSelect: "none",
  },
  '& [data-reach-listbox-option][aria-selected="true"]': {
    background: "hsl(211, 81%, 46%)",
    color: "hsl(0, 0%, 100%)",
  },
  "& [data-reach-listbox-option][data-current]": {
    fontWeight: "bolder",
  },
  '& [data-reach-listbox-option][aria-disabled="true"]': {
    opacity: 0.5,
  },
};

const Listbox = React.forwardRef(
  ({ options, value, onChange, ...props }, ref) => {
    return (
      <ListboxInput
        value={value}
        onChange={onChange}
        ref={ref}
        sx={inputStyle}
        {...props}
      >
        <ListboxButton arrow="▼" />
        <ListboxPopover sx={popoverStyle}>
          <ListboxList>
            {options.map(option => (
              <ListboxOption key={option} value={option}>
                {option}
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    );
  }
);

export default Listbox;
