import React from "react";

import Grid from "../grid";
import Heading from "../heading";
import BlockContent from "./blockContent";
import Image from "./image";

const TextAndImage = props => {
  // console.log(props)
  const { text, title, image: imageModule } = props;

  return (
    <Grid columns={[1, null, 2]} py={5} mx="auto" maxWidth="full">
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
      {imageModule && <Image {...imageModule} />}
    </Grid>
  );
};

export default TextAndImage;
