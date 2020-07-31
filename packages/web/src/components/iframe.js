/** @jsx jsx */
import { jsx } from "theme-ui";

import { Box, systemProps } from "./box";
import { omitProps, includeProps } from "../utils/filterProps";

const omitBoxProps = omitProps(systemProps);
const includeBoxProps = includeProps(systemProps);

const Iframe = ({ src, width, height, title, ...props }) => {
  return (
    <Box
      position="relative"
      sx={{
        overflow: "hidden",
      }}
      {...omitBoxProps(props)}
    >
      <Box
        as="span"
        aria-hidden
        sx={{
          position: "relative",
          "::after": {
            display: "block",
            width: "100%",
            pb: `calc(100%/(${width}/${height}))`,
            content: "''",
          },
        }}
      />
      <Box
        as="iframe"
        src={src}
        frameborder="0"
        title={title}
        width={width}
        height={height}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        {...includeBoxProps(props)}
      />
    </Box>
  );
};

export default Iframe;
