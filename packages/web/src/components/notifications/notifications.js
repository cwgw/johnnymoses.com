/** @jsx jsx */
import { jsx } from "theme-ui";
import Portal from "@reach/portal";

import {
  useCurrentNotification,
  useRemoveNotifications,
} from "../../context/notifications";

import Flex from "../flex";
import Box from "../box";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";

const Notifications = () => {
  const notification = useCurrentNotification();
  const removeNotifications = useRemoveNotifications();

  if (!notification) {
    return null;
  }

  const { message, actions = [], status } = notification;

  const icons = {
    success: "check-circle",
    default: "alert-triangle",
  };

  return (
    <Portal>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "primary",
          color: "white",
        }}
      >
        <Flex variant="container" alignItems="center" px={4} py={2}>
          <Icon
            icon={icons[status] || icons.default}
            animated
            delay={300}
            fontSize={4}
            sx={{ flexShrink: 0 }}
          />
          <Text
            as="span"
            px={3}
            variant="utils.truncate"
            sx={{ width: "100%" }}
          >
            {message}
          </Text>
          {actions.map(([value, action]) => (
            <Button
              key={value}
              onClick={() => {
                removeNotifications();
                if (typeof action === "function") {
                  action();
                }
              }}
              sx={{ flexShrink: 0, mr: 2 }}
              variant="secondary"
              color="white"
              children={value}
            />
          ))}
          <Button onClick={() => removeNotifications()}>
            <Icon icon="x" />
          </Button>
        </Flex>
      </Box>
    </Portal>
  );
};

export default Notifications;
