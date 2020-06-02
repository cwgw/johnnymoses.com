export default {
  title: "Hero",
  name: "hero",
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
      title: "",
    },
    prepare(selection) {
      return Object.assign({}, selection, {
        title: "Hero",
      });
    },
  },
};
