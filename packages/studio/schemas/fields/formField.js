export default {
  title: "Form Field",
  name: "formField",
  type: "object",
  fields: [
    {
      title: "Label",
      name: "label",
      type: "string",
      validation: Rule => Rule.required().error("A label is required."),
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "Text", value: "text" },
          { title: "Textarea", value: "textarea" },
        ],
      },
      validation: Rule => Rule.required().error("A type is required."),
    },
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: Rule => Rule.required().error("A name is required."),
    },
  ],
  preview: {
    select: {
      title: "label",
    },
  },
};
