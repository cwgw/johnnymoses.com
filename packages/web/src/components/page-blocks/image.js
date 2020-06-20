import React from "react";

import Image from "../image";
import Figure from "../figure";

const ImageBlock = ({ image, imageModule, caption, ...props }) => {
  // console.log({image, caption, ...props})
  // console.log({...image, ...props})
  if (caption) {
    return <Figure {...image} {...imageModule} caption={caption} {...props} />;
  }

  return <Image {...image} {...imageModule} {...props} />;
};

export default ImageBlock;
