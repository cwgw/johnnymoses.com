/** @jsx jsx */
import { jsx } from "theme-ui";

import BlockContent from "./blockContent";
import Image from "./image";
import Flex from "../flex";
import Box from "../box";
// import Grid from "../grid";

const HeroModule = props => {
  const { imageModule, blocks } = props;
  return (
    <Flex
      sx={{
        alignItems: "center",
        // maxWidth: "100%",
        backgroundColor: "lightYellowGreen",
        mx: [0, 0, 4],
        flexWrap: "wrap",
        "& > *": {
          flexBasis: ["100%", null, "50%"],
        },
      }}
    >
      <Image {...imageModule} width={800} loading="eager" fadeIn={false} />
      <Box>
        <BlockContent
          sx={{
            p: 4,
            // width: ["100%", null, "50vw"],
            maxWidth: "half",
            mx: [0, 0, "auto"],
          }}
          blocks={blocks}
        />
      </Box>
    </Flex>
  );

  // return (
  //   <Grid
  //     columns={[1, null, 2]}
  //     gap={3}
  //     sx={{
  //       alignItems: "center",
  //       maxWidth: "100%",
  //       backgroundColor: "lightYellowGreen",
  //       mx: 4,
  //     }}
  //   >
  //     <Image
  //       sx={{
  //         maxHeight: [400, 500, "none"],
  //       }}
  //       {...imageModule}
  //     />
  //     <BlockContent
  //       sx={{
  //         px: 4,
  //         width: ["100%", null, "50vw"],
  //         maxWidth: "half",
  //         mx: "auto"
  //       }}
  //       blocks={blocks}
  //     />
  //   </Grid>
  // );
};

export default HeroModule;
