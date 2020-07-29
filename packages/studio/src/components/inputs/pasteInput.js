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

import styles from "./pasteInput.css";

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

  const [isDialogOpen, setDialog] = React.useState(false);
  const [pastedTextValue, setTextValue] = React.useState();

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

  const closeDialog = () => {
    setDialog(false);
    const parsedText = parsePastedText(pastedTextValue);
    if (parsedText) {
      patchInputData(parsedText);
    }
  };

  const patchInputData = data => {
    // array items need a unique _key property
    // @see https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/form-builder/src/inputs/ArrayInput/randomKey.ts
    // const values = Object.entries(data).map(([key, value]) => {})
    const patches = [setIfMissing({ _type: type.name })];
    console.log(PatchEvent(patches));
    // onChange(PatchEvent(patches));
  };

  const handlePastedTextChange = e => {
    const value = e.currentTarget.value;
    setTextValue(value);
  };

  console.log(type.fields);

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
        <Dialog isOpen onClose={closeDialog} title="Paste value">
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
  let json;
  try {
    json = JSON.parse(text);
    return json;
  } catch (error) {}
}

export default PasteInput;

/* TypeError: cyclic object value */
