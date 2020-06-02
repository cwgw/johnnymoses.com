import React from "react";

import Module from "../components/modules";

const renderPageModules = (modules = []) => {
  console.log({ modules });
  return modules.map(({ _key, _type, ...module }) => (
    <Module key={_key} type={_type} {...module} />
  ));
};

export default renderPageModules;
