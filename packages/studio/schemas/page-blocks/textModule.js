// import React from "react";

export default {
  title: "Standard Text",
  name: "textModule",
  type: "object",
  // hidden: true,
  fields: [
    {
      name: "text",
      title: "Text",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return Object.assign({}, selection, {
        title: "Standard Text",
      });
    },
  },
};
