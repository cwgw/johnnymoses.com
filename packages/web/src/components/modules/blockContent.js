import React from "react";
import SanityBlockContent from "@sanity/block-content-to-react";

import { Box } from "../common";

import serializer from "../../utils/blockContentSerializer";

const BlockContent = ({ blocks, ...props }) => {
  return (
    <SanityBlockContent
      blocks={blocks}
      renderContainerOnSingleChild={true}
      serializers={{
        ...serializer,
        container: _props => <Box {...props} {..._props} />,
      }}
    />
  );
};

export default BlockContent;
