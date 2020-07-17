export default {
  title: "Meta Information",
  name: "metaCard",
  type: "object",
  // hidden: true,
  fieldsets: [
    {
      name: "opengraph",
      title: "Open Graph Meta Properties",
      options: {
        collapsible: false,
        collapsed: false,
      },
    },
    {
      name: "twitter",
      title: "Twitter Meta Properties",
      options: {
        collapsible: false,
        collapsed: false,
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
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "opengraphImage",
      title: "Open Graph Image",
      type: "image",
      description: "Ideal size for open graph images is 1200 x 600",
      options: {
        hotspot: true,
      },
      fieldset: "opengraph",
    },
    {
      name: "opengraphTitle",
      title: "Open Graph Title",
      type: "string",
      fieldset: "opengraph",
    },
    {
      name: "opengraphDescription",
      title: "Open Graph Description",
      type: "text",
      fieldset: "opengraph",
    },
    {
      name: "twitterImage",
      title: "Twitter Image",
      type: "image",
      description: "Ideal size for twitter images is 800 x 418",
      fieldset: "twitter",
      options: {
        hotspot: true,
      },
    },
    {
      name: "twitterTitle",
      title: "Twitter Card Title",
      type: "string",
      fieldset: "twitter",
    },
    {
      name: "twitterCreator",
      title: "Twitter Creator",
      type: "string",
      fieldset: "twitter",
    },
    {
      name: "twitterDescription",
      title: "Twitter Description",
      type: "text",
      fieldset: "twitter",
    },
  ],
};
