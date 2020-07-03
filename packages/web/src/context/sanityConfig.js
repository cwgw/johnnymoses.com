import React from 'react'

export const SanityConfigContext = React.createContext({});

export const SanityConfigProvider = ({ projectId, dataset, children }) => {
  return (
    <SanityConfigContext.Provider
      value={{
        config: {
          projectId,
          dataset,
        }
      }}
    >
      {children}
    </SanityConfigContext.Provider>
  )
}

export const useSanityConfig = () => {
  return React.useContext(SanityConfigContext);
}
