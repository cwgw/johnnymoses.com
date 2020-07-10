// import Tabs from "sanity-plugin-tabs";

export default {
  name: "productThirdPartyContent",
  title: "Product Content",
  type: "object",
  // inputComponent: Tabs,
  fieldsets: [
    { name: "main", title: "Main" },
    { name: "defaultMeta", title: "Meta" },
  ],
  fields: [
    {
      type: "productThirdPartyModule",
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
