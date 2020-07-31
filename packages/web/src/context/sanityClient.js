import React from "react";
// import sanityClient from "@sanity/client";
import sanityClient from "picosanity";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  useCdn: true,
  withCredentials: false,
};

const client = sanityClient(config);

const SanityClientContext = React.createContext({});

const SanityClientProvider = ({ children }) => {
  const imgUrl = React.useMemo(() => {
    const imageBuilder = imageUrlBuilder(config);
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
