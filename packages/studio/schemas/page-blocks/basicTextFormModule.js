export default {
  title: "Text and Form",
  name: "basicTextFormModule",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      title: "Text Content",
      name: "text",
      type: "blockContent",
    },
    {
      title: "Form",
      name: "form",
      type: "formModule",
    },
  ],
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return Object.assign({}, selection, {
        title: "Text and Form",
      });
    },
  },
};
