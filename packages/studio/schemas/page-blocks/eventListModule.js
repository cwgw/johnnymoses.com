export default {
  title: "Event List",
  name: "eventListModule",
  type: "object",
  hidden: true,
  fields: [
    {
      name: "title",
      title: "Title (Optional)",
      type: "string",
    },
    {
      name: "shortDescription",
      title: "Short Description (Optional)",
      type: "string",
    },
    {
      name: "events",
      title: "Events",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "event" }],
        },
      ],
      validation: Rule => Rule.min(1).max(40),
    },
  ],
};
