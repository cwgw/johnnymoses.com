/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import Portal from "@reach/portal";

import { animated, useTransition } from "react-spring";

import {
  useNotificationItems,
  useRemoveNotification,
} from "../../context/notifications";

import Toast from "./toast";
import Flex from "../flex";

const Notifications = () => {
  const items = useNotificationItems();
  const [refMap] = React.useState(() => new WeakMap());
  const [cancelMap] = React.useState(() => new WeakMap());
  const removeNotification = useRemoveNotification();

  const timeout = 5000;

  const transition = useTransition(items, {
    key: item => item.id,
    from: {
      height: 0,
      opacity: 0,
      transform: "translateX(100%)",
      life: "100%",
    },
    enter: item => async next =>
      await next({
        height: refMap.get(item).offsetHeight + 8,
        transform: "translateX(0%)",
        opacity: 1,
      }),
    leave: item => async (next, stop) => {
      cancelMap.set(item, () => {
        next({
          height: 0,
          opacity: 0,
          transform: "translateX(100%)",
          config: { immediate: true },
        });
      });
      await next({
        height: 0,
        opacity: 0,
        transform: "translateX(100%)",
        delay: timeout,
      });
    },
    onRest: (spring, item) => {
      removeNotification(item.key);
    },
    config: {
      precision: 0.005,
    },
  });

  if (!items || items.length < 0) {
    return null;
  }

  return (
    <Portal>
      <Flex
        flexDirection="column-reverse"
        alignItems="end"
        sx={{
          position: "fixed",
          top: 2,
          right: 2,
        }}
      >
        {transition((style, item) => (
          <animated.div
            style={{
              position: "relative",
              ...style,
            }}
          >
            <Toast
              ref={ref => refMap.set(item, ref)}
              onDismiss={async () => {
                if (cancelMap.has(item)) {
                  cancelMap.get(item)();
                }
                removeNotification(item.id);
              }}
              {...item}
              timer={style.life}
            />
          </animated.div>
        ))}
      </Flex>
    </Portal>
  );
};

export default Notifications;
