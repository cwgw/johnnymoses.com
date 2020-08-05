/** @jsx jsx */
import { jsx } from "theme-ui";

import Image from "./image";

import Box from "../box";
import Flex from "../flex";
import PortableText from "../portableText";
// import Grid from "../grid";

const HeroModule = props => {
  const { imageModule, blocks } = props;
  return (
    <Flex
      sx={{
        position: "relative",
        alignItems: "center",
        backgroundColor: "lightYellowGreen",
        overflow: "hidden",
        mx: [0, 0, 4],
        flexWrap: "wrap",
        "& > *": {
          flexBasis: ["100%", null, "50%"],
        },
      }}
    >
      <Image {...imageModule} width={800} loading="eager" />
      <Box sx={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <svg preserveAspectRatio="none" height="0" width="0">
            <defs>
              <filter id="turb">
                <feTurbulence
                  id="_fractalNoise"
                  type="fractalNoise"
                  baseFrequency="0.0075"
                  numOctaves="3"
                  seed="1"
                ></feTurbulence>
                <feComponentTransfer>
                  <feFuncR
                    type="discrete"
                    tableValues="1 0 1 0 1 0 1 0 1"
                  ></feFuncR>
                  <feFuncG
                    type="discrete"
                    tableValues="1 0 1 0 1 0 1 0 1"
                  ></feFuncG>
                  <feFuncB
                    type="discrete"
                    tableValues="1 0 1 0 1 0 1 0 1"
                  ></feFuncB>
                </feComponentTransfer>
                <feColorMatrix
                  id="_colorMatrix"
                  type="matrix"
                  values="0.5 0.5 0.9 0 0 0.4 0.8 0.7 0 0 0.2 0.7 0.7 0 0 0.7 0.1 0.6 1 0"
                ></feColorMatrix>
              </filter>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" filter="url(#turb)" />
          </svg>
        </div>
        <PortableText
          sx={{
            p: 4,
            // width: ["100%", null, "50vw"],
            position: "relative",
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
  //     <PortableText
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
