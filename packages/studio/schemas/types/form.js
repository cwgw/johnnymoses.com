export default {
  title: "Form",
  name: "form",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      title: "Fields",
      name: "formFields",
      type: "array",
      of: [
        {
          type: "formField",
        },
      ],
    },
    {
      title: "Submit Button Text",
      name: "submitValue",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    // prepare() {
    //   return Object.assign(
    //     {},
    //     {
    //       title: "Form",
    //     }
    //   );
    // },
  },
};
