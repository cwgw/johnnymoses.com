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
      subtitle: "content.main.productType",
      media: "content.main.mainImage",
    },
    prepare: ({ title, media, subtitle }) => {
      return {
        title,
        subtitle: `${subtitle} (Third Party)`,
        media,
      };
    },
  },
};
