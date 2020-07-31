import * as productMetaFields from "../product-meta";

const metaFieldTypes = Object.values(productMetaFields).map(({ name }) => ({
  type: name,
}));

export default {
  title: "Product Content",
  name: "productModule",
  type: "object",
  hidden: false,
  fieldsets: [
    {
      name: "modules",
      title: "Page Sections",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      readOnly: true,
      description: "This has to stay in sync with Shopify",
      options: {
        source: "content.main.title",
        maxLength: 96,
      },
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
      name: "productMetaFields",
      title: "Additional Info",
      type: "array",
      of: metaFieldTypes,
    },
    {
      name: "modules",
      title: "Modules",
      type: "moduleContent",
      fieldset: "modules",
    },
  ],
};
