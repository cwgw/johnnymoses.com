// import Tabs from "sanity-plugin-tabs";

export default {
  name: "postContent",
  type: "object",
  title: "Page Content",
  // inputComponent: Tabs,
  fieldsets: [
    { name: "main", title: "Main" },
    { name: "defaultMeta", title: "Meta" },
  ],
  fields: [
    {
      type: "postModule",
      name: "main",
      fieldset: "main",
    },
    {
      type: "metaCard",
      name: "meta",
      fieldset: "defaultMeta",
    },
  ],
};
