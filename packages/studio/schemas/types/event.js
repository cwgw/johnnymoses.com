export default {
  name: "event",
  title: "Event",
  type: "document",
  liveEdit: false,
  fields: [
    {
      name: "content",
      type: "eventContent",
    },
  ],
  preview: {
    select: {
      title: "content.main.title",
    },
  },
};
