/** @jsx jsx */
import { jsx } from "theme-ui";

import Grid from "../grid";
import Heading from "../heading";
import PortableText from "../portableText";
import Image from "./image";

const TextAndImage = ({ text, title, image: imageModule, ...props }) => {
  return (
    <Grid variant="container" columns={[1, null, 2]} py={5} {...props}>
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
