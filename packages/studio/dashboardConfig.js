export default {
  widgets: [
    {
      name: "project-info",
      layout: {
        width: "large",
        height: "small",
      },
    },
    {
      name: "project-users",
      layout: {
        width: "medium",
        height: "small",
      },
    },
    {
      name: "google-calendar-list",
      options: {
        displayProperties: ["nextSyncToken", "channelId", "channelExpiration"],
      },
      layout: {
        width: "medium",
        height: "small",
      },
    },
  ],
};
