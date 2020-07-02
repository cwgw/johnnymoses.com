export default {
  title: "Image Module",
  name: "imageModule",
  type: "object",
  // hidden: true,
  fields: [
    {
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Alternative Text",
      name: "alt",
      type: "string",
    },
    {
      title: "Image Caption",
      name: "caption",
      type: "text",
    },
    {
      title: "Layout",
      name: "layout",
      type: "string",
      options: {
        list: [
          { title: "Full", value: "full" },
          { title: "large", value: "large" },
          { title: "medium", value: "medium" },
        ],
        layout: "dropdown",
      },
    },
  ],
};
