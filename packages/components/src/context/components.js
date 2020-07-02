import React from "react";

export const ComponentContext = React.createContext({ link: "a" });

export const ComponentProvider = ({ children, value }) => {
  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useLocalComponent = () => {
  return React.useContext(ComponentContext);
};
