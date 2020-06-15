import React from "react";

import Image from "./image";

const Figure = ({ image, caption }) => {
  return (
    <figure>
      <Image {...image} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default Figure;
