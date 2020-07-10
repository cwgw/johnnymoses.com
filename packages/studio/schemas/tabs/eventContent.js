// import Tabs from "sanity-plugin-tabs";

export default {
  name: "eventContent",
  type: "object",
  title: "Event Content",
  // inputComponent: Tabs,
  fieldsets: [
    {
      name: "main",
      title: "Main",
      collapsible: true,
      collapsed: false,
      columns: 2,
    },
  ],
  fields: [
    {
      type: "eventModule",
      name: "main",
      fieldset: "main",
    },
  ],
};
