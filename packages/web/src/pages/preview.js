import React from "react";
import { Router } from "@reach/router";
// import useSWR from "swr";

// import { useSanityClient } from "../context/sanityClient";
// import { pageQuery, productQuery } from "../utils/sanityQueries";
import Box from "../components/box";

import Page from "../templates/page";
import Product from "../templates/product";

const PreviewPage = ({ documentId, revision }) => {
  // disable links in page previews
  React.useEffect(() => {
    window.___navigate = () => {
      alert(
        "This is a draft preview. Navigation to other pages from this page is disabled."
      );
      return false;
    };
  }, []);

  // const { client } = useSanityClient();

  // const fetcher = React.useCallback(
  //   async (documentId, revision) => {
  //     const query = `*[_id == $documentId && _rev == $revision][0] {
  //       ...,
  //       _type == "page" => ${pageQuery},
  //       _type == "product" => ${productQuery}
  //     }`;
  //     return client.fetch(query, { documentId, revision });
  //   },
  //   [client]
  // );

  // const { data, error } = useSWR([documentId, revision], fetcher);
  let data, error;

  if (typeof data === "undefined" && !error) {
    return (
      <Box
        variant="container"
        sx={{
          textAlign: "center",
          p: 4,
          backgroundColor: "grays.800",
        }}
      >
        Loading…
      </Box>
    );
  }

  if (error) {
    console.error(error);
    return (
      <Box variant="container" p={3} sx={{ textAlign: "center" }}>
        Couldn't load preview data.
      </Box>
    );
  }

  switch (data._type) {
    case "page": {
      return <Page previewData={data} />;
    }
    case "product": {
      return <Product previewData={data} />;
    }
    default: {
      return null;
    }
  }
};

const Previews = () => {
  return (
    <div>
      <Router>
        <PreviewPage path="/preview/:documentId/:revision" />
      </Router>
    </div>
  );
};

export default Previews;
