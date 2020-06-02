export default {
  title: "Page Content",
  name: "pageModule",
  type: "object",
  // hidden: true,
  fieldsets: [
    {
      name: "modules",
      title: "Page Modules",
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
      options: {
        source: "content.main.title",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: "pageTemplate",
      title: "Template",
      type: "string",
      options: {
        list: [
          { title: "Full", value: "fullWidth" },
          { title: "Columns", value: "splitWidth" },
        ],
      },
    },
    {
      name: "modules",
      title: "Modules",
      type: "moduleContent",
      fieldset: "modules",
    },
  ],
};
