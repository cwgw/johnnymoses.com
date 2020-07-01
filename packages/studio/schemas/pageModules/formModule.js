export default {
  title: "Form",
  name: "formModule",
  type: "object",
  fields: [
    {
      title: "Form",
      name: "form",
      type: "reference",
      to: [{ type: "form" }],
    },
    {
      title: "Accompanying Text",
      name: "text",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "form.title",
    },
  },
};
