/** @jsx jsx */
import React from "react";
import client from "part:@sanity/base/client";
import { ThemeProvider, jsx } from "theme-ui";
import { Global } from "@emotion/core";
import merge from "lodash/merge";

import { globalStyles, theme } from "@johnnymoses.com/theme";

import * as pageBlocks from "../../../schemas/page-blocks";

export default props => {
  const _modules = props.document.displayed?.content?.main?.modules;
  const [modules, setState] = React.useState();

  React.useEffect(() => {
    expandNestedReferences({ modules: _modules, documentId: props.documentId })
      .then(setState)
      .catch(error => {
        throw error;
      });
  }, [_modules]);

  const { projectId, dataset } = client.clientConfig;

  if (modules) {
    return (
      <SanityClientProvider projectId={projectId} dataset={dataset}>
        <React.Fragment>
          <Global style={globalStyles} />
          <ThemeProvider theme={theme}>
            {renderPageModules(modules)}
          </ThemeProvider>
        </React.Fragment>
      </SanityClientProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        sx={{
          backgroundColor: "grays.900",
          my: 4,
          mx: "auto",
          p: 3,
          textAlign: "center",
          maxWidth: "half",
        }}
      >
        Loading…
      </div>
    </ThemeProvider>
  );
};

function expandNestedReferences({ modules, documentId }) {
  return Promise.all(
    modules.map(async module => {
      const schema = pageBlocks[module._type];
      const queryFragment = createQueryFragment(schema.fields, "module");
      const query =
        queryFragment &&
        `*[_id==$documentId][0] { "module": content.main.modules[_key==$key][0] } | { ${queryFragment} }`;

      let fetchedData;
      try {
        fetchedData = await client.fetch(query, {
          documentId,
          key: module._key,
        });
      } catch (error) {
        throw error;
      }

      return merge({}, module, fetchedData);
    })
  );
}

function createQueryFragment(field, parent) {
  if (Array.isArray(field)) {
    let fields = field.map(o => createQueryFragment(o, parent)).filter(Boolean);
    return fields.length > 0 && fields.join(", ");
  }

  if (field.type === "reference") {
    return `"${field.name}": ${parent}.${field.name}->`;
  }

  if (field.type === "array") {
    if (field.of.some(e => e.type === "reference")) {
      return `"${field.name}": ${parent}.${field.name}[]->`;
    }
  }

  if (pageBlocks[field.type]) {
    const block = pageBlocks[field.type];
    const blockFields = createQueryFragment(
      block.fields,
      `${parent}.${field.name}`
    );
    if (blockFields) {
      return `"${field.name}": { ${blockFields} }`;
    }
  }

  return;
}
