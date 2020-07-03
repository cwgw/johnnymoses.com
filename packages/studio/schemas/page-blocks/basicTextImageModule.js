export default {
  title: "Text and Image",
  name: "basicTextImageModule",
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
      title: "Image",
      name: "image",
      type: "imageModule",
    },
  ],
  preview: {
    select: {
      title: "",
    },
    prepare(selection) {
      return Object.assign({}, selection, {
        title: "Text and Image",
      });
    },
  },
};
