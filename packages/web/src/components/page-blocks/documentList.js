/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import useSWR from "swr";

import { useSanityClient } from "../../context/sanityClient";

import Box from "../box";
import Heading from "../heading";
import EventCard from "../events/card";
import PostCard from "../posts/card";
import ProductCard from "../products/card";
import Grid from "../grid";
// import Icon from "../icon";

const DynamicList = ({ query, children }) => {
  const { client } = useSanityClient();
  const fetcher = React.useCallback(
    async query => {
      return client.fetch(query);
    },
    [client]
  );

  const { data, error } = useSWR(query, fetcher);

  // to-do: better error and empty state handling
  if (error || !data || data.length < 1) {
    return null;
  }

  return <React.Fragment>{children(data)}</React.Fragment>;
};

const DocumentList = ({ title, items: { query, items }, ...props }) => {
  return (
    <Box mx={4} py={5} {...props}>
      <Box variant="container">
        {title && <Heading px={4}>{title}</Heading>}
        <Grid as="ul" columns={[1]} maxWidth="half">
          {query ? (
            <DynamicList query={query}>
              {items =>
                items.map(item => (
                  <Box key={item._id} as="li">
                    {renderItem(item)}
                  </Box>
                ))
              }
            </DynamicList>
          ) : (
            items.map(item => (
              <Box key={item._id} as="li">
                {renderItem(item)}
              </Box>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

function renderItem({ _type, ...item }) {
  switch (_type) {
    case "event": {
      return <EventCard {...item} />;
    }
    case "post": {
      return <PostCard {...item} />;
    }
    case "product": {
      return <ProductCard {...item} />;
    }
    default: {
      return <Heading>{`No card component for "${_type}" type`}</Heading>;
    }
  }
}

export default DocumentList;
