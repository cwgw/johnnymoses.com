export default {
  name: "productVariant",
  title: "Variant",
  type: "document",
  __experimental_actions: ["update", "publish", "delete"],
  fields: [
    {
      name: "content",
      type: "variantContent",
    },
  ],
  preview: {
    select: {
      subtitle: "content.main.title",
      title: "content.shopify.variantTitle",
      media: "mainImage",
    },
  },
};
