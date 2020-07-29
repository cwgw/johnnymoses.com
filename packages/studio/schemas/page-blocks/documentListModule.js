export default {
  title: "Document List",
  name: "documentListModule",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Text",
      name: "text",
      type: "blockContent",
    },
    {
      title: "Items",
      name: "items",
      type: "documentList",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Document List Section",
    }),
  },
};
