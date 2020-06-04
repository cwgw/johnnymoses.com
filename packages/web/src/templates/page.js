/** @jsx jsx */
import { jsx } from "theme-ui";

import renderPageModules from "../utils/renderPageModules";

import Layout from "../layouts/page";
import { Grid } from "../components/common";

const PageTemplate = ({
  pageContext: {
    main: { modules, slug, title, pageTemplate },
  },
}) => {
  if (pageTemplate === "splitWidth") {
    return (
      <Layout>
        <Grid
          columns={2}
          width="full"
          mx="auto"
          sx={{
            // width: "full",
            // mx: "auto",
            alignItems: "start",
          }}
        >
          {renderPageModules(modules)}
        </Grid>
      </Layout>
    );
  }

  return <Layout>{renderPageModules(modules)}</Layout>;
};

export default PageTemplate;
