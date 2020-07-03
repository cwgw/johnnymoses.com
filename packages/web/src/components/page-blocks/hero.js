/** @jsx jsx */
import { jsx } from "theme-ui";

import BlockContent from "./blockContent";
import Image from "./image";
import Grid from "../grid";

const HeroModule = props => {
  const { imageModule, blocks } = props;
  return (
    <Grid
      columns={[1, null, 2]}
      gap={3}
      sx={{
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <Image
        sx={{
          maxHeight: [400, 500, "none"],
        }}
        {...imageModule}
      />
      <BlockContent
        sx={{
          px: 4,
          width: ["100%", null, "50vw"],
          maxWidth: "half",
        }}
        blocks={blocks}
      />
    </Grid>
  );
};

export default HeroModule;
