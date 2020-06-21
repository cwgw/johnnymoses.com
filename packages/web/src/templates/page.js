/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import renderPageModules from "../utils/renderPageModules";

const PageTemplate = ({
  pageContext: {
    main: { modules },
  },
}) => {
  return <React.Fragment>{renderPageModules(modules)}</React.Fragment>;
};

export default PageTemplate;
