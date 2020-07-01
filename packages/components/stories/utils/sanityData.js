import React from "react";
import isEmpty from "lodash/isEmpty";

const sanity = require("@sanity/client");

const client = sanity({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
});

const dataCache = new Map([]);

const queries = {
  formModule: `
    *[content.main.modules[]._type == $module][0]{
      'form': content.main.modules[_type match $module][0].form->,
      'text': content.main.modules[_type match $module][0].text,
    }
  `,
  heroModule: `
    *[content.main.modules[]._type == $module][0]{
      'data': content.main.modules[_type match $module][0],
    } | {
      ...data
    }
  `,
  productGridModule: `
    *[content.main.modules[]._type == $module][0]{
      'data': content.main.modules[_type match $module][0],
      'products': content.main.modules[_type match $module][0].products[]->,
    } | {
      ...data,
      products
    }
  `,
  eventListModule: `
    *[content.main.modules[]._type == $module][0]{
      'data': content.main.modules[_type match $module][0],
      'events': content.main.modules[_type match $module][0].events[]->
    } | {
      ...data,
      events
    }
  `,
  basicTextImageModule: `
    *[content.main.modules[]._type == $module][0]{
      'data': content.main.modules[_type match $module][0],
    } | {
      ...data,
    }
  `,
  basicTextFormModule: `
    *[content.main.modules[]._type == $module][0]{
      'data': content.main.modules[_type match $module][0],
    } | {
      ...data,
      'form': {
        ...data.form,
        'form': data.form.form->
      }
    }
  `,
};

export const SanityData = ({ module, children }) => {
  const [data, setState] = React.useState(
    dataCache.has(module) ? dataCache.get(module) : null
  );

  React.useEffect(() => {
    if (!module || !queries[module]) {
      return;
    }

    if (dataCache.has(module)) {
      let cache = dataCache.get(module);
      if (data !== cache) {
        setState(cache);
      }
    } else {
      client.fetch(queries[module], { module }).then(result => {
        dataCache.set(module, result);
        setState(result);
      });
    }
  }, [module]);

  if (isEmpty(data)) {
    return (
      <div>
        <code>{module}</code> module not currently in use
      </div>
    );
  } else if (data) {
    return children(data);
  }

  return (
    <div>
      Fetching data for <code>{module}</code>
    </div>
  );
};
