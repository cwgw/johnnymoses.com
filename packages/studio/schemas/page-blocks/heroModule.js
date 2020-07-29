import { toPlainText } from "../../utils/helpers";

export default {
  title: "Hero",
  name: "heroModule",
  type: "object",
  fields: [
    {
      title: "Text",
      name: "blocks",
      type: "blockContent",
      validation: Rule => Rule.required(),
    },
    {
      title: "Image",
      name: "imageModule",
      type: "imageModule",
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      text: "blocks",
    },
    prepare: ({ text }) => {
      const title = toPlainText(text);
      // console.log({ text })
      return {
        title,
        subtitle: "Hero Section",
      };
    },
  },
};
