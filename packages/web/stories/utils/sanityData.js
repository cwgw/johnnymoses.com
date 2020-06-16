import React from "react";
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
};

export const SanityData = ({ module, children }) => {
  const [data, setState] = React.useState(null);

  React.useEffect(() => {
    if (dataCache.has(module)) {
      // console.log('USING DATA CACHE')
      setState(dataCache.get(module));
      return;
    }

    if (module && queries[module]) {
      // console.log('PERFORMING QUERY')
      client.fetch(queries[module], { module }).then(result => {
        setState(result);
        dataCache.set(module, result);
      });
    }
  }, [module]);

  if (data) {
    return children(data);
  }

  return <div>Fetching data for '{module}'</div>;
};
