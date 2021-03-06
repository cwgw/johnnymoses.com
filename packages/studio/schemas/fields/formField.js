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
    {
      title: "Required",
      name: "required",
      type: "boolean",
    },
    {
      title: "Hint",
      name: "hint",
      type: "string",
    },
    {
      title: "Placeholder",
      name: "placeholder",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "label",
    },
  },
};
