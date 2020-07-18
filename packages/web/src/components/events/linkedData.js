import React from "react";

const LinkedData = ({ main }) => {
  const { descriptionText, end, location, start, title } = main;

  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    startDate: end,
    endDate: start,
    description: descriptionText,
    performer: {
      "@type": "Person",
      name: "Johnny Moses",
    },
  };

  if (location) {
    data.location = {
      "@type": "Place",
      name: location,
      address: location,
    };
  }

  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
};

export default LinkedData;
