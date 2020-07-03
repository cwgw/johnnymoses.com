import React from "react";

import Image from "../image";
import Figure from "../figure";

const ImageBlock = ({ className, image, imageModule, caption, ...props }) => {
  // console.log({image, caption, ...props})
  // console.log({...image, ...props})
  if (caption) {
    return (
      <Figure
        className={className}
        {...image}
        {...imageModule}
        caption={caption}
        {...props}
      />
    );
  }

  return <Image className={className} {...image} {...imageModule} {...props} />;
};

export default ImageBlock;
