/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import queryString from "query-string";

import BlockContent from "./blockContent";
import Box from "../box";
import Button from "../button";
import FormField from "../formField";
import Grid from "../grid";
import Text from "../text";

const FormModule = ({
  text,
  className,
  form: { formFields, slug, submitValue },
}) => {
  const fieldStyles = {
    text: {},
    textarea: {
      gridColumn: "1/-1",
    },
  };

  const name = slugify(slug.current);
  const [status, setStatus] = React.useState();

  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    setStatus("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: queryString.stringify(data),
      });

      if (response.status === 200) {
        setStatus("success");
      } else {
        setStatus("failure");
      }
    } catch (error) {
      setStatus("failure");
    }
  };

  let content = (
    <Grid
      as="form"
      gap={0}
      columns={[1, 2]}
      sx={{ gridColumnGap: 3 }}
      data-netlify={true}
      method="POST"
      action="#"
      onSubmit={handleSubmit(onSubmit)}
      name={name}
    >
      {formFields &&
        formFields.map(({ _key, _type, required, ...field }) => (
          <FormField
            key={_key}
            ref={register({ required })}
            required={required}
            sx={fieldStyles[field.type]}
            {...field}
          />
        ))}
      <input ref={register} type="hidden" name="form-name" value={name} />
      <Button type="submit" sx={{ gridColumn: "-2/-1" }}>
        {submitValue}
      </Button>
    </Grid>
  );

  if (status === "sending") {
    content = <Text>Sending…</Text>;
  }

  if (status === "success") {
    content = <Text>Thank you for your submission.</Text>;
  }

  if (status === "failure") {
    content = (
      <React.Fragment>
        <p>
          <strong>Something went wrong.</strong>
        </p>
        <p>
          Sorry, your form couldn't be submitted due to a server problem. Please
          try again later.
        </p>
      </React.Fragment>
    );
  }

  return (
    <Box className={className}>
      <BlockContent blocks={text} mb={4} />
      {content}
    </Box>
  );
};

export default FormModule;
