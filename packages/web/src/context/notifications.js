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
      return items.filter(o => o.id !== id);
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

const useAddNotification = () => {
  const { dispatch } = React.useContext(NotificationContext);
  return _item => {
    const item = { id: uniqueId("toast"), ..._item };
    dispatch(["ITEM_ADDED", { item }]);
  };
};

const useRemoveNotification = () => {
  const { dispatch } = React.useContext(NotificationContext);
  return id => {
    dispatch(["ITEM_REMOVED", { id }]);
  };
};

export {
  NotificationContextProvider,
  useNotificationItems,
  useRemoveNotification,
  useAddNotification,
};
