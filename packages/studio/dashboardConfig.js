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
        displayProperties: [
          "resourceId",
          "channelId",
          "channelExpiration",
          "nextSyncToken",
        ],
      },
      layout: {
        width: "medium",
        height: "small",
      },
    },
  ],
};
