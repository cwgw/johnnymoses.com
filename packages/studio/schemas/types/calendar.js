export default {
  name: "calendar",
  title: "Calendar",
  type: "document",
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      title: "Calendar ID",
      name: "calendarId",
      type: "string",
    },
    {
      title: "Sync Token",
      name: "nextSyncToken",
      type: "string",
      readOnly: true,
    },
    {
      title: "Notification Resource ID",
      name: "resourceId",
      type: "string",
      readOnly: true,
    },
    {
      title: "Notification Channel ID",
      name: "channelId",
      type: "string",
      readOnly: true,
    },
    {
      title: "Notification Channel Expiration",
      name: "channelExpiration",
      type: "string",
      readOnly: true,
    },
    {
      title: "Notification Channel Token",
      name: "channelToken",
      type: "string",
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: "calendarId",
    },
  },
};
