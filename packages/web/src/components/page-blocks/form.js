/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import queryString from "query-string";

import Box from "../box";
import Button from "../button";
import FormField from "../formField";
import PortableText from "../portableText";
import Text from "../text";

const FormModule = ({
  text,
  form: { formFields, slug, submitValue },
  ...props
}) => {
  const fieldStyles = {
    text: {},
    textarea: {
      gridColumn: "1/-1",
    },
  };

  const name = slugify(slug.current);
  const [status, setStatus] = React.useState();

  const {
    register,
    // errors,
    // formState,
    handleSubmit,
  } = useForm();

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

  if (!status) {
    return (
      <Box
        as="form"
        data-netlify={true}
        method="POST"
        action="#"
        onSubmit={handleSubmit(onSubmit)}
        name={name}
        {...props}
      >
        <PortableText as="header" blocks={text} mb={4} />
        {formFields &&
          formFields.map(({ _key, _type, required, ...field }, i, arr) => (
            <FormField
              key={_key}
              ref={register({ required })}
              required={required}
              sx={{
                ...fieldStyles[field.type],
                // mb: i === arr.length - 1 ? 4 : 3,
              }}
              {...field}
            />
          ))}
        <input ref={register} type="hidden" name="form-name" value={name} />
        <Button type="submit">{submitValue}</Button>
      </Box>
    );
  }

  let content;

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
    <Box {...props}>
      <PortableText blocks={text} mb={4} />
      {content}
    </Box>
  );
};

export default FormModule;
