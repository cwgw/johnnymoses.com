export default {
  title: "Vendor Information",
  name: "productThirdPartyModule",
  type: "object",
  hidden: false,
  fieldsets: [
    {
      name: "modules",
      title: "Product Modules",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "main",
      title: "Product Main Content",
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
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      validation: Rule => Rule.required(),
    },
    {
      name: "vendorName",
      title: "Vendor Name",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "productType",
      title: "Type",
      type: "string",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fieldset: "main",
      validation: Rule => Rule.required(),
    },
    {
      name: "productDescription",
      title: "Product Description",
      type: "blockContent",
      fieldset: "main",
    },
    {
      name: "modules",
      title: "Modules",
      type: "moduleContent",
      fieldset: "modules",
    },
  ],
};
