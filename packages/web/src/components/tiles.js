/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useSelection } from "@zendeskgarden/container-selection";

import Button from "./button";
import Icon from "./icon";
import Flex from "./flex";

const Tiles = ({ options, value: controlledValue, onChange, ...props }) => {
  const refs = React.useMemo(
    () => (options ? options.map(() => React.createRef()) : []),
    [options]
  );

  const { getContainerProps, getItemProps } = useSelection({
    direction: "both",
    selectedItem: controlledValue,
    onSelect: onChange,
  });

  return (
    <Flex
      {...getContainerProps({ role: "radiogroup" })}
      sx={{
        listStyle: "none",
        mx: -1,
        mt: -2,
        p: 0,
        display: "flex",
        flexFlow: "row wrap",
        "& > button": {
          mx: 1,
          mt: 2,
        },
      }}
      {...props}
    >
      {options &&
        options.map((value, i) => (
          <Button
            {...getItemProps({
              selectedAriaKey: "aria-checked",
              role: "radio",
              item: value,
              focusRef: refs[i],
            })}
            data-checked={controlledValue === value}
            key={value}
            ref={refs[i]}
            variant="tile"
          >
            <Icon variant="tile" icon={value} />
            <span>{value}</span>
          </Button>
        ))}
    </Flex>
  );
};

export default Tiles;
