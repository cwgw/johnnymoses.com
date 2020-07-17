import React from "react";
import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export const SanityClientContext = React.createContext({});

export const SanityClientProvider = ({ projectId, dataset, children }) => {
  const value = React.useMemo(() => {
    const config = { projectId, dataset };
    const client = sanityClient({
      ...config,
      useCdn: true,
      withCredentials: true,
    });
    const imageBuilder = imageUrlBuilder(client);
    const imgUrl = source => imageBuilder.image(source);
    return { client, config, imgUrl };
  }, [projectId, dataset]);

  return <SanityClientContext.Provider value={value} children={children} />;
};

export const useSanityClient = () => {
  return React.useContext(SanityClientContext);
};
