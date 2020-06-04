import React from "react";

import * as components from "../components/modules";

const upperCaseFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

const renderPageModules = (modules = []) => {
  // console.log({ modules });
  return modules.map(({ _key, _type, ...module }) => {
    const Element = components[upperCaseFirst(_type)];
    if (!!!Element) {
      return <h3 key={_key}>{_type}</h3>;
    }

    return <Element key={_key} {...module} />;
  });
};

export default renderPageModules;
