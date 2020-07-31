export default {
  name: "page",
  title: "Page",
  type: "document",
  liveEdit: false,
  fields: [
    {
      name: "content",
      type: "pageContent",
    },
  ],
  preview: {
    select: {
      title: "content.main.title",
      subtitle: "heroText",
      media: "mainImage",
    },
  },
};
