import { format } from "date-fns";

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
      date: "content.main.start",
    },
    prepare: ({ title, date }) => {
      return {
        title,
        subtitle: format(new Date(date), "MMM. d, y"),
      };
    },
  },
};
