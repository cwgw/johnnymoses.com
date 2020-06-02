import React from "react";

import Hero from "./hero";
import ImageModule from "./imageModule";
import StandardText from "./standardText";
import BookingForm from "./bookingForm";

const Module = ({ type, ...props }) => {
  switch (type) {
    case "bookingFormModule": {
      return <BookingForm {...props} />;
    }
    case "hero": {
      return <Hero {...props} />;
    }
    case "imageModule": {
      return <ImageModule {...props} />;
    }
    case "standardText": {
      return <StandardText {...props} />;
    }
    default: {
      return <h3>{type}</h3>;
    }
  }
};

export default Module;
