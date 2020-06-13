/** @jsx jsx */
import { jsx } from "theme-ui";

import BlockContent from "./blockContent";
import { ImageModule } from "./imageModule";
import { Grid } from "../common";

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
      <ImageModule maxHeight={[400, 500, "none"]} {...imageModule} />
      <BlockContent
        px={4}
        // width="half"
        // maxWidth={["100%", null, "50vw"]}
        width={["100%", null, "50vw"]}
        maxWidth="half"
        blocks={blocks}
      />
    </Grid>
  );
};

export { HeroModule };
