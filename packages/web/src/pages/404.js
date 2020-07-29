import React from "react";

import SEO from "../components/seo";
import Box from "../components/box";

const NotFoundPage = () => (
  <Box variant="container">
    <Box mx={4}>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn't</p>
    </Box>
  </Box>
);

export default NotFoundPage;
