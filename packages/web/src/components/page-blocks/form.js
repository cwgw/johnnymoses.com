/** @jsx jsx */
import { jsx } from "theme-ui";

import BlockContent from "./blockContent";
import Box from "../box";
import Button from "../button";
import FormField from "../formField";
import Grid from "../grid";

const FormModule = props => {
  const {
    text,
    className,
    // slug,
    form: { formFields, submitValue },
  } = props;
  const fieldStyles = {
    text: {},
    textarea: {
      gridColumn: "1/-1",
    },
  };

  return (
    <Box className={className}>
      <BlockContent blocks={text} mb={4} />
      <Grid
        as="form"
        gap={0}
        columns={[1, 2]}
        sx={{
          gridColumnGap: 3,
        }}
      >
        {formFields.map(({ _key, ...field }) => (
          <FormField key={_key} sx={fieldStyles[field.type]} {...field} />
        ))}
        <Button
          type="submit"
          sx={{
            gridColumn: "-2/-1",
          }}
        >
          {submitValue}
        </Button>
      </Grid>
    </Box>
  );
};

export default FormModule;
