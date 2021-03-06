export default {
  title: "Product Grid",
  name: "productGridModule",
  type: "object",
  hidden: true,
  fields: [
    {
      name: "title",
      title: "Title (Optional)",
      type: "string",
    },
    {
      name: "shortDescription",
      title: "Short Description (Optional)",
      type: "string",
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }, { type: "productThirdParty" }],
        },
      ],
      validation: Rule => Rule.min(1).max(40),
    },
  ],
};
