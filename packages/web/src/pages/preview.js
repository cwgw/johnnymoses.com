import React from "react";
import { Router } from "@reach/router";
import useSWR from "swr";
import isEmpty from "lodash/isEmpty";

import { useSanityClient } from "../context/sanityClient";
import { pageQuery } from "../utils/sanityQueries";

import Page from "../templates/page";

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

  const { client } = useSanityClient();

  const fetcher = React.useCallback(
    async (documentId, revision) => {
      const query = `*[_id == $documentId && _rev == $revision][0] { ..., _type == "page" => ${pageQuery} }`;
      return client.fetch(query, { documentId, revision });
    },
    [client]
  );

  const { data, error } = useSWR([documentId, revision], fetcher);

  if (isEmpty(data) || error) {
    return <div>Couldn't load preview data.</div>;
  }

  if (data) {
    return <Page previewData={data} />;
  }

  return <div>Loading…</div>;
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
