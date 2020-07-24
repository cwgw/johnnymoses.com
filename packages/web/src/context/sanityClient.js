import React from "react";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
};

const client = sanityClient({
  ...config,
  useCdn: true,
  withCredentials: true,
});

const SanityClientContext = React.createContext({});

const SanityClientProvider = ({ children }) => {
  const imgUrl = React.useMemo(() => {
    const imageBuilder = imageUrlBuilder(client);
    return source => imageBuilder.image(source);
  }, []);

  return (
    <SanityClientContext.Provider
      value={{
        client,
        config,
        imgUrl,
      }}
      children={children}
    />
  );
};

const useSanityClient = () => {
  return React.useContext(SanityClientContext);
};

export { client, SanityClientProvider, useSanityClient };
