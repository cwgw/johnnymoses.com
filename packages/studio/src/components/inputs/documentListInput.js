import PropTypes from "prop-types";
import React from "react";
import Fieldset from "part:@sanity/components/fieldsets/default";
import {
  PatchEvent,
  setIfMissing,
  set,
} from "part:@sanity/form-builder/patch-event";
import { FormBuilderInput } from "part:@sanity/form-builder";
import { List, Item } from "part:@sanity/components/lists/default";
import Label from "part:@sanity/components/labels/default";
import SanityPreview from "part:@sanity/base/preview";
import client from "part:@sanity/base/client";

import styles from "./documentListInput.css";

import * as types from "../../../schemas/types";

const propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  level: PropTypes.number,
  value: PropTypes.shape({
    _type: PropTypes.string,
  }),
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const DocumentListInput = React.forwardRef(
  ({ focusPath, level, onBlur, onChange, onFocus, type, value }, ref) => {
    const [items, setItems] = React.useState([]);

    const [listField, fields] = React.useMemo(() => {
      let listField,
        fields = [];
      for (let field of type.fields) {
        if (field.name === "query") {
          listField = field;
          continue;
        }
        fields.push(field);
      }
      return [listField, fields];
    }, [type]);

    React.useEffect(() => {
      if (value.query) {
        fetchItems();
      }

      async function fetchItems() {
        const items = await client.fetch(value.query);
        if (items) {
          setItems(items);
        }
      }
    }, [value.query]);

    const handleFieldChange = React.useCallback(
      field => fieldPatchEvent => {
        const next = fieldPatchEvent.patches.reduce((obj, { type, value }) => {
          return type === "set" ? { [field.name]: value } : obj;
        }, {});
        const query = getQuery(Object.assign({}, value, next));
        const patches = [
          setIfMissing({ _type: type.name }),
          ...fieldPatchEvent.patches.map(patch =>
            Object.assign({}, patch, { path: [field.name] })
          ),
          set(query, ["query"]),
        ];

        onChange(PatchEvent.from(patches));
      },
      [onChange, type, value]
    );

    return (
      <Fieldset
        level={level}
        legend={type.title}
        description={type.description}
      >
        <div className={styles.fieldContainer}>
          {fields.map((field, i) => (
            <FormBuilderInput
              className={styles.field}
              level={level + 1}
              ref={i === 0 ? ref : null}
              key={field.name}
              type={field.type}
              value={value && value[field.name]}
              onChange={handleFieldChange(field)}
              path={[field.name]}
              focusPath={focusPath}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          ))}
          {items && (
            <div>
              <Label>{listField.type.title}</Label>
              <List>
                {items.map(item => (
                  <Item key={item._id} level={level + 1}>
                    <SanityPreview value={item} type={types[value.type]} />
                  </Item>
                ))}
              </List>
            </div>
          )}
        </div>
      </Fieldset>
    );
  }
);

DocumentListInput.propTypes = propTypes;

export default DocumentListInput;

function getQuery({ filter, type, limit = 5 }) {
  switch (filter) {
    case "upcoming": {
      return `*[_type=="${type}" && content.main.start > now()] | order(content.main.start asc) [0...${limit}]`;
    }
    case "recent": {
      return `*[_type=="${type}"] | order(_createdAt desc) [0...${limit}]`;
    }
    default: {
      return `*[_type=="${type}"][0...${limit}]`;
    }
  }
}
