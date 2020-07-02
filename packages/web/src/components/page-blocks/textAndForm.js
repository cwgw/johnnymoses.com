/** @jsx jsx */
import { jsx } from "theme-ui";

import Grid from "../grid";
import Heading from "../heading";
import BlockContent from "./blockContent";
import Form from "./form";

const TextAndForm = props => {
  const { text, title, form: formModule, className } = props;

  return (
    <Grid
      className={className}
      columns={[1, null, 2]}
      sx={{
        mx: "auto",
        maxWidth: "full",
      }}
    >
      {title && (
        <Heading
          sx={{
            px: 4,
            gridColumn: "1/-1",
          }}
        >
          {title}
        </Heading>
      )}
      {text && <BlockContent px={4} blocks={text} />}
      {formModule && (
        <Form
          {...formModule}
          sx={{
            position: "sticky",
            top: 0,
            p: 4,
            alignSelf: "start",
          }}
        />
      )}
    </Grid>
  );
};

export default TextAndForm;
