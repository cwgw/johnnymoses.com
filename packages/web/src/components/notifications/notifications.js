/** @jsx jsx */
import { jsx } from "theme-ui";
import Portal from "@reach/portal";

import {
  useNotificationItems,
  useRemoveNotification,
  useClearNotifications,
} from "../../context/notifications";

import Flex from "../flex";
import Box from "../box";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";

const Notifications = () => {
  const items = useNotificationItems();
  const clearNotifications = useClearNotifications();
  const removeNotification = useRemoveNotification();

  if (!items || items.length < 1) {
    return null;
  }

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
        <Flex
          variant="container"
          justifyContent="space-between"
          alignItems="start"
          px={4}
          py={2}
        >
          <Flex flexDirection="column" flexBasis="100%">
            {items.map(({ id, message, status, actions }) => (
              <Flex alignItems="center" key={id}>
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
                {actions &&
                  actions.map(([value, action]) => (
                    <Button
                      key={value}
                      onClick={() => {
                        removeNotification(id);
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
              </Flex>
            ))}
          </Flex>
          <Button onClick={clearNotifications}>
            <Icon icon="x" />
          </Button>
        </Flex>
      </Box>
    </Portal>
  );
};

export default Notifications;
