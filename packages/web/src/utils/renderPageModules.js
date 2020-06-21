/** @jsx jsx */
import { jsx } from "theme-ui";

import * as components from "../components/page-blocks";

const renderPageModules = (modules = []) => {
  return modules.map(({ _key, _type, ...module }) => {
    const Element = components[_type];
    if (!!!Element) {
      return <h3 key={_key}>{_type}</h3>;
    }

    return <Element sx={{ my: 5 }} key={_key} {...module} />;
  });
};

export default renderPageModules;
