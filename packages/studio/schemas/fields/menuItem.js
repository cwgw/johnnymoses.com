export default {
  title: "Dropdown",
  name: "menuItem",
  type: "object",
  hidden: true,
  fields: [
    {
      name: "title",
      title: "Dropdown CTA",
      type: "string",
    },
    {
      name: "items",
      title: "Nav Items",
      type: "array",
      of: [
        { type: "menuItem" },
        { type: "internalLink" },
        { type: "externalLink" },
      ],
    },
  ],
};
