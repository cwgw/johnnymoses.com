/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import {
  Menu,
  MenuButton,
  MenuLink,
  MenuItem,
  MenuItems,
  MenuPopover,
} from "@reach/menu-button";

import Button from "./button";
import Icon from "./icon";

const Dropdown = ({ value, children, ...props }) => {
  return (
    <React.Fragment>
      <Menu>
        <MenuButton as={Button} {...props}>
          {value} <Icon icon="chevron-down" />
        </MenuButton>
        <MenuPopover
          sx={{
            display: "block",
            position: "absolute",
            "&[hidden]": {
              display: "none",
            },
          }}
        >
          <MenuItems
            sx={{
              position: "relative",
              display: "block",
              whiteSpace: "nowrap",
              outline: "none",
              variant: "menuButton.list",
            }}
          >
            {React.Children.map(children, child => {
              const isLink = !!(child.props.to || child.props.href);
              const isMenuItem = typeof child.props.onSelect === "function";

              if (isLink || isMenuItem) {
                return React.createElement(isLink ? MenuLink : MenuItem, {
                  as: child.type,
                  isLink,
                  sx: {
                    display: "block",
                    userSelect: "none",
                  },
                  variant: "menuButton.link",
                  ...child.props,
                });
              }

              return child;
            })}
          </MenuItems>
        </MenuPopover>
      </Menu>
      <noscript>{children}</noscript>
    </React.Fragment>
  );
};

export default Dropdown;
