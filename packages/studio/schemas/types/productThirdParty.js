export default {
  name: "productThirdParty",
  title: "Third-Party Product",
  type: "document",
  fields: [
    {
      name: "content",
      type: "productThirdPartyContent",
    },
  ],
  preview: {
    select: {
      title: "content.main.title",
      media: "content.main.mainImage",
    },
  },
};
