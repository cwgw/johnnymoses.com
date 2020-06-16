import React from "react";

import Image from "../image";
import Figure from "../figure";

const ImageBlock = ({ image, caption, ...props }) => {
  if (caption) {
    return <Figure {...image} caption={caption} {...props} />;
  }

  return <Image {...image} {...props} />;
};

export default ImageBlock;
