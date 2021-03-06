import { format } from "date-fns";

export default {
  title: "News Item",
  name: "post",
  type: "document",
  fields: [
    {
      name: "content",
      type: "postContent",
    },
  ],
  preview: {
    select: {
      title: "content.main.title",
      createdAt: "_createdAt",
    },
    prepare: ({ title, createdAt }) => {
      const subtitle = createdAt
        ? `Created on: ${format(new Date(createdAt), "MMM. d, y")}`
        : null;

      return { title, subtitle };
    },
  },
};
