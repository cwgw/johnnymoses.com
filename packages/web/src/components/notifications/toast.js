/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import Box from "../box";
import Flex from "../flex";
import Icon from "../icon";
import Text from "../text";
import Button from "../button";

const buttonGroupStyles = {
  [Button]: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderColor: "green !important",
  },
};

const Toast = React.forwardRef(
  (
    {
      title,
      subtitle,
      message,
      status,
      actions: _actions,
      onDismiss,
      timer,
      ...props
    },
    ref
  ) => {
    const handleDismiss = () => onDismiss();

    const actions = _actions.length > 0 ? _actions : [["Dismiss"]];

    const icon = status === "success" ? "check-circle" : "alert-triangle";
    const color = status === "success" ? "green" : null;

    return (
      <Box
        sx={{
          boxShadow: 4,
        }}
      >
        <Flex
          sx={{
            width: "360px",
            backgroundColor: "background",
            cursor: typeof onClick === "function" ? "pointer" : "default",
            border: "1px solid",
            borderColor: "grays.800",
            alignItems: "center",
            borderRadius: 4,
            overflow: "hidden",
          }}
          ref={ref}
          {...props}
        >
          <Icon
            my={2}
            ml={3}
            animated
            delay={300}
            variant="tile"
            icon={icon}
            color={color}
            sx={{
              flexShrink: 0,
            }}
          />
          <Flex flexDirection="column" mx={3} my={2} flexBasis="100%">
            <Text as="span" variant="utils.truncate">
              {title}
            </Text>
            <Text as="small" variant="utils.truncate">
              {subtitle}
            </Text>
          </Flex>

          {actions && (
            <Flex
              flexDirection="column"
              flexShrink={0}
              justifySelf="end"
              m="-1px"
              ml="auto"
              sx={buttonGroupStyles}
            >
              {actions.map(([value, action]) => {
                const handleClick = () => {
                  if (typeof action === "function") {
                    action();
                  }
                  handleDismiss();
                };

                return (
                  <Button
                    key={value}
                    variant="secondary"
                    fontSize={1}
                    onClick={handleClick}
                    sx={{
                      borderColor: "grays.800",
                      ":first-of-type": {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                      ":nth-of-type(n+2)": {
                        mt: "-1px",
                      },
                      ":nth-of-type(n+2):not(:last-child)": {
                        borderRadius: 0,
                      },
                      ":last-of-type": {
                        borderBottomLeftRadius: 0,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                      },
                    }}
                  >
                    {value}
                  </Button>
                );
              })}
            </Flex>
          )}
        </Flex>
      </Box>
    );
  }
);

export default Toast;
