/** @jsx jsx */
import { jsx } from "theme-ui";

import renderPageModules from "../utils/renderPageModules";

import Layout from "../layouts/page";
import Grid from "../components/grid";

const PageTemplate = ({
  pageContext: {
    main: { modules, slug, title, pageTemplate },
  },
}) => {
  if (pageTemplate === "splitWidth") {
    return (
      <Layout>
        <Grid
          columns={[1, null, 2]}
          sx={{
            mx: "auto",
            width: "full",
            alignItems: "start",
            maxWidth: "100%",
            "& > *": {
              maxWidth: "100%",
            },
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
