import React from 'react'

export const SanityClientContext = React.createContext({});

export const SanityClientProvider = ({ projectId, dataset, children }) => {
  return (
    <SanityClientContext.Provider
      value={{
        config: {
          projectId,
          dataset
        }
      }}
    >
      {children}
    </SanityClientContext.Provider>
  )
}

export const useSanityClient = () => {
  return React.useContext(SanityClientContext);
}
