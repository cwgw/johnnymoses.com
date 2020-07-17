// import Tabs from "sanity-plugin-tabs";

export default {
  name: "globalContent",
  title: "Global Content",
  type: "object",
  // inputComponent: Tabs,
  fieldsets: [
    { name: "defaultMeta", title: "Meta" },
    { name: "social", title: "Social" },
    { name: "routes", title: "Routes" },
  ],
  fields: [
    {
      name: "siteTitle",
      title: "Site Title",
      type: "string",
    },
    {
      name: "siteHostname",
      title: "Site Hostname",
      type: "slug",
    },
    {
      // title: "Site Routes",
      type: "routes",
      name: "routes",
      description: "Site routing config for products, etc",
      fieldset: "routes",
    },
    {
      type: "metaCard",
      name: "metaInformation",
      description: "Handles the default meta information for all content types",
      fieldset: "defaultMeta",
    },
    {
      type: "social",
      name: "social",
      description: "Handles the default meta information for all content types",
      fieldset: "social",
    },
  ],
};
