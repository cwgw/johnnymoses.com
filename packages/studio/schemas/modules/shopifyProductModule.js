export default {
  title: "Shopify Product Content",
  name: "shopifyProductModule",
  type: "object",
  hidden: false,
  fieldsets: [
    {
      name: "default",
      title: "Default Variant",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      readOnly: true,
    },
    {
      name: "handle",
      title: "Handle",
      type: "string",
      readOnly: true,
    },
    {
      name: "id",
      title: "ID",
      type: "string",
      description: "This comes from Shopify and cannot be changed",
      readOnly: true,
      hidden: true,
    },
    {
      name: "deleted",
      title: "Deleted",
      type: "boolean",
      description: "This can be a flag set if the item is deleted from Shopify",
      readOnly: true,
    },
    {
      name: "productId",
      title: "Product ID",
      type: "number",
      description: "This comes from Shopify and cannot be changed",
      readOnly: true,
      hidden: true,
    },
    {
      name: "productType",
      title: "Type",
      type: "string",
      description: "This comes from Shopify and cannot be changed",
      readOnly: true,
    },
    {
      name: "defaultPrice",
      title: "Default Price",
      type: "string",
      description: "This comes from Shopify and cannot be changed",
      readOnly: true,
    },
    {
      name: "variants",
      title: "Variants",
      type: "array",
      of: [{ type: "reference", to: { type: "productVariant" } }],
    },
    {
      name: "stringifiedProductData",
      title: "Data",
      type: "text",
      readOnly: true,
    },
    {
      name: "defaultVariant",
      type: "defaultVariant",
    },
  ],
};
