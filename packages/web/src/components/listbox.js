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

import Icon from "./icon";
import Box from "./box";

import { includeSpaceProps, omitSpaceProps } from "../utils/filterProps";

const Listbox = React.forwardRef(
  ({ options, value, onChange, ...props }, ref) => {
    return (
      <ListboxInput
        value={value}
        onChange={onChange}
        ref={ref}
        {...includeSpaceProps(props)}
      >
        <Box
          as={ListboxButton}
          __css={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "default",
            userSelect: "none",
          }}
          variant="input"
          {...omitSpaceProps(props)}
          __themeKey="listbox"
        >
          {value}
          <Icon ml={3} icon="chevron-down" />
        </Box>
        <Box
          as={ListboxPopover}
          __css={{
            display: "block",
            position: "absolute",
            minWidth: "min-content",
            outline: "none",
            "&[hidden]": {
              display: "none",
            },
          }}
        >
          <Box
            as={ListboxList}
            __css={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              ":focus": {
                outline: "none",
              },
            }}
            variant="list"
            __themeKey="listbox"
          >
            {options.map(option => (
              <Box
                as={ListboxOption}
                __css={{
                  display: "block",
                  margin: "0",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
                key={option}
                value={option}
                variant="option"
                __themeKey="listbox"
              >
                {option}
              </Box>
            ))}
          </Box>
        </Box>
      </ListboxInput>
    );
  }
);

export default Listbox;
