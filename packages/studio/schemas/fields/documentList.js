import DocumentListInput from "../../src/components/inputs/documentListInput";

export default {
  title: "Document List",
  name: "documentList",
  type: "object",
  fields: [
    {
      title: "Document Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "event" },
          { title: "News items", value: "post" },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: "Filter",
      name: "filter",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Most Recently Created", value: "recent" },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: "Limit",
      name: "limit",
      type: "number",
      validation: Rule => Rule.min(1).max(12).precision(0),
    },
    {
      title: "Preview",
      name: "query",
      type: "string",
      readOnly: true,
    },
  ],
  inputComponent: DocumentListInput,
};
