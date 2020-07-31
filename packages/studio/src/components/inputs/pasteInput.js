import React from "react";
import {
  PatchEvent,
  setIfMissing,
} from "part:@sanity/form-builder/patch-event";
import { FormBuilderInput } from "part:@sanity/form-builder";
import Fieldset from "part:@sanity/components/fieldsets/default";
import Dialog from "part:@sanity/components/dialogs/default";
import DialogContent from "part:@sanity/components/dialogs/content";
import Button from "part:@sanity/components/buttons/default";
import Text from "part:@sanity/components/textareas/default";
import isPlainObject from "lodash/isPlainObject";

import * as pathUtils from "@sanity/util/paths";

import styles from "./pasteInput.css";
import { randomKey } from "../../../utils/helpers";

console.log({ pathUtils });

const pasteInputType = {
  name: "pasteInput",
  type: {
    jsonType: "string",
    name: "text",
    preview: {
      prepare: () => ({ title: "Pasted Input" }),
    },
    type: {
      jsonType: "string",
      name: "text",
    },
  },
};

const PasteInput = React.forwardRef((props, ref) => {
  const { focusPath, level, onBlur, onChange, onFocus, type, value } = props;

  // console.log({ type})

  const [isDialogOpen, setDialog] = React.useState(false);
  const [pastedTextValue, setTextValue] = React.useState();

  // const normalizedFields = React.useMemo(
  //   () => {
  //     return normalize(type.fields);

  //     function normalize(fields) {
  //       return fields.reduce((o, field) => {
  //         o[field.name] =
  //       }. {})
  //     }
  //   },
  //   [type]
  // )

  const handleFieldChange = React.useCallback(
    field => fieldPatchEvent => {
      onChange(
        fieldPatchEvent
          .prefixAll(field.name)
          .prepend(setIfMissing({ _type: type.name }))
      );
    },
    [onChange, type]
  );

  const handleClick = () => {
    setDialog(b => !b);
  };

  const handleDialogClose = () => {
    setDialog(false);
    const parsedText = parsePastedText(pastedTextValue);
    const patches = createPatchesFromInput(parsedText);
    console.log({ patches });
    if (patches.length > 0) {
      const patchEvent = new PatchEvent(patches).prepend(
        setIfMissing({ _type: type.name, _key: randomKey(12) })
      );
      console.log({ patchEvent });
      onChange(patchEvent);
    }
  };

  const handlePastedTextChange = e => {
    const value = e.currentTarget.value;
    setTextValue(value);
  };

  // console.log(type.fields)

  return (
    <React.Fragment>
      <div className={styles.fieldContainer}>
        {type.fields.map((field, i) => (
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
      </div>
      <div className={styles.actions}>
        <Button onClick={handleClick} kind="secondary">
          Paste content
        </Button>
      </div>
      {isDialogOpen && (
        <Dialog isOpen onClose={handleDialogClose} title="Paste value">
          <DialogContent>
            <Text
              onChange={handlePastedTextChange}
              value={pastedTextValue}
              // ref={el => el.focus()}
            />
            <div>Some text in the dialog</div>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
});

function parsePastedText(text) {
  console.log({ text });
  let json;
  try {
    json = JSON.parse(text);
    console.log({ json });
    return json;
  } catch (error) {
    console.warn(`Couldn't parse json`, error);
  }
}

function createPatchesFromInput(value, parentPath = []) {
  if (!value) {
    return [];
  }

  if (isPlainObject(value)) {
    return Object.entries(value).reduce((arr, [key, val]) => {
      const path = parentPath.concat([key]);
      return arr.concat([
        { type: "setIfMissing", path },
        ...createPatchesFromInput(val, path),
      ]);
    }, []);
  }

  if (Array.isArray(value)) {
    return [
      {
        type: "insert",
        path: parentPath,
        items: value.map(o => ({
          ...o,
          _key: randomKey(12),
        })),
      },
    ];

    // return value.map((o, i) => ({
    //   type: "insert",
    //   path: parentPath,
    //   value: {
    //     ...o,
    //     _key: randomKey(12),
    //   },
    // }));
  }

  return [
    {
      type: "set",
      value,
    },
  ];
}

export default PasteInput;

/* TypeError: cyclic object value */
