import React from "react";
import sanityClient from "@sanity/client";

export const SanityClientContext = React.createContext({});

export const SanityClientProvider = ({ projectId, dataset, children }) => {
  const value = React.useMemo(() => {
    const config = { projectId, dataset };
    const client = sanityClient({
      ...config,
      useCdn: false,
      withCredentials: true,
    });
    return { client, config };
  }, [projectId, dataset]);

  return <SanityClientContext.Provider value={value} children={children} />;
};

export const useSanityClient = () => {
  return React.useContext(SanityClientContext);
};
