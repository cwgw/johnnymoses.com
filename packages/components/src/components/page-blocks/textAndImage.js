/** @jsx jsx */
import { jsx } from "theme-ui";

import Grid from "../grid";
import Heading from "../heading";
import BlockContent from "./blockContent";
import Image from "./image";

const TextAndImage = props => {
  const { text, title, image: imageModule, className } = props;

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
      {imageModule && (
        <div
          sx={{
            position: "relative",
            px: 4,
          }}
        >
          <Image {...imageModule} />
        </div>
      )}
    </Grid>
  );
};

export default TextAndImage;
