export default {
  title: "Event Content",
  name: "eventModule",
  type: "object",
  // hidden: true,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      readOnly: true,
    },
    {
      name: "start",
      title: "Start Date & Time",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "end",
      title: "End Date & Time",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      readOnly: true,
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      readOnly: true,
    },
  ],
};
