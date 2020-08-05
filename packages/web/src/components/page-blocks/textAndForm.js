/** @jsx jsx */
import { jsx } from "theme-ui";

import Grid from "../grid";
import Heading from "../heading";
import PortableText from "../portableText";
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
      {text && <PortableText px={4} blocks={text} />}
      {formModule && (
        <aside>
          <Form
            {...formModule}
            sx={{
              position: "sticky",
              top: 0,
              bottom: 0,
              px: 4,
              alignSelf: "start",
            }}
          />
        </aside>
      )}
    </Grid>
  );
};

export default TextAndForm;
