import React from "react";
import uniqueId from "lodash/uniqueId";

const NotificationContext = React.createContext({ items: [] });

const reducer = (items, [type, payload]) => {
  switch (type) {
    case "ITEM_ADDED": {
      const { item } = payload;
      return items.concat([item]);
    }
    case "ITEM_REMOVED": {
      const { id } = payload;
      if (Array.isArray(id)) {
        return items.filter(o => !id.includes(o.id));
      }
      return items.filter(o => o.id !== id);
    }
    case "ITEMS_CLEARED": {
      return [];
    }
    default: {
      return items;
    }
  }
};

const NotificationContextProvider = ({ children }) => {
  const [items, dispatch] = React.useReducer(reducer, []);

  return (
    <NotificationContext.Provider
      value={{ items, dispatch }}
      children={children}
    />
  );
};

const useNotificationItems = () => {
  const { items } = React.useContext(NotificationContext);
  return items;
};

const useCurrentNotification = () => {
  const { items } = React.useContext(NotificationContext);
  return items.length > 0 ? items[items.length - 1] : undefined;
};

const useAddNotification = () => {
  const { dispatch } = React.useContext(NotificationContext);
  return _item => {
    const item = { id: uniqueId("toast"), ..._item };
    dispatch(["ITEM_ADDED", { item }]);
  };
};

const useRemoveNotifications = () => {
  const { dispatch } = React.useContext(NotificationContext);
  return id => {
    if (id) {
      dispatch(["ITEM_REMOVED", { id }]);
    } else {
      dispatch(["ITEMS_CLEARED"]);
    }
  };
};

export {
  NotificationContextProvider,
  useAddNotification,
  useCurrentNotification,
  useNotificationItems,
  useRemoveNotifications,
};
