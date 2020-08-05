import DocumentListInput from "../../src/components/inputs/documentListInput";

export default {
  title: "Document List",
  name: "documentList",
  type: "object",
  fields: [
    {
      title: "Select items",
      name: "selection",
      description:
        "For lists based on criteria like 'Most recent', use dynamic.",
      type: "string",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Manually", value: "manual" },
          { title: "Dynamically", value: "dynamic" },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      title: "Items",
      name: "items",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "event" }, { type: "post" }, { type: "product" }],
        },
      ],
    },
    {
      title: "Document Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "event" },
          { title: "News items", value: "post" },
          { title: "Products", value: "product" },
        ],
      },
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
    },
    {
      title: "Limit",
      name: "limit",
      type: "number",
      validation: Rule => Rule.min(-1).max(12).precision(0),
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
