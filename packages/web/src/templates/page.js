/** @jsx jsx */
import { jsx } from "theme-ui";

import renderPageModules from "../utils/renderPageModules";

import Layout from "../layouts/index";

const PageTemplate = ({
  pageContext: {
    main: { modules, slug, title },
  },
}) => {
  return <Layout>{renderPageModules(modules)}</Layout>;
};

export default PageTemplate;
