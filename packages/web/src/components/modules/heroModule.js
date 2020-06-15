/** @jsx jsx */
import { jsx } from "theme-ui";

import BlockContent from "./blockContent";
import { ImageModule } from "./imageModule";
import Grid from "../grid";

const HeroModule = ({ imageModule, blocks }) => {
  return (
    <Grid
      columns={[1, null, 2]}
      gap={3}
      sx={{
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <ImageModule
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

export { HeroModule };
