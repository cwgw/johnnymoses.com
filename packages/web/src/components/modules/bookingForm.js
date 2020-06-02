/** @jsx jsx */
import { jsx } from "theme-ui";
import { useStaticQuery, graphql } from "gatsby";

import BlockContent from "./blockContent";
import { Box, Button, FormField, Grid } from "../common";

const BookingForm = ({ text }) => {
  const data = useStaticQuery(graphql`
    {
      sanityBookingForm {
        formFields {
          _key
          label
          type
        }
        submitValue
      }
    }
  `);

  const { formFields, submitValue } = data.sanityBookingForm;

  const fieldStyles = {
    text: {},
    textarea: {
      gridColumn: "1/-1",
    },
  };

  return (
    <Box
      p={4}
      sx={{
        position: "sticky",
        top: 0,
      }}
    >
      <BlockContent blocks={text} mb={4} />
      <Grid
        as="form"
        gap={0}
        columns={2}
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

export default BookingForm;
