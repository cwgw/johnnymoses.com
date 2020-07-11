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
      name: "cancelled",
      title: "Cancelled",
      description: 'This event has been cancelled or deleted in your calendar',
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
    {
      name: "uid",
      title: "UId",
      type: "string",
      readOnly: true,
    },
    {
      name: "updated",
      title: "Last Updated",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "created",
      title: "Creation Date",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "htmlLink",
      title: "Calendar Link",
      type: "url",
      readOnly: true,
    },
  ],
};
