export default {
  title: "Track",
  name: "track",
  type: "object",
  fields: [
    {
      title: "Track Name",
      name: "name",
      type: "string",
    },
    {
      title: "Duration",
      name: "duration",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
