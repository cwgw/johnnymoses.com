/** @jsx jsx */
import { jsx } from "theme-ui";

import BlockContent from "./blockContent";
import ImageModule from "./imageModule";
import { Grid } from "../common";

const Hero = ({ imageModule, blocks }) => {
  // console.log({ imageModule, blocks });
  return (
    <Grid
      columns={[1, null, 2]}
      gap={3}
      sx={{
        alignItems: "center",
      }}
    >
      <ImageModule {...imageModule} />
      <BlockContent
        px={4}
        sx={{
          width: "half",
          maxWidth: ["100%", null, "50vw"],
        }}
        blocks={blocks}
      />
    </Grid>
  );
};

export default Hero;
